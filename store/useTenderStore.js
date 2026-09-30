import { create } from 'zustand';
import api from '../shared/api';

const useTenderStore = create((set, get) => ({
  tenders: [],
  isLoadingTenders: false,
  tendersError: null,

  // 5-Step Flow State
  // 1: Upload PDF -> 2: List Documents -> 3: Identify Eligibility -> 4: Extract Key Info -> 5: Capture Deadlines
  currentStep: 1,
  uploadedFile: null,
  isAnalyzing: false,
  analysisProgress: 0,
  extractedTender: null,
  uploadError: null,

  setCurrentStep: (step) => set({ currentStep: step }),

  setUploadedFile: (file) => set({ uploadedFile: file }),

  startAnalysis: async (file) => {
    set({ isAnalyzing: true, analysisProgress: 15, uploadError: null });

    try {
      const formData = new FormData();
      formData.append('document', file);

      // Simulated step progression for smooth UX feel
      const progressTimer = setInterval(() => {
        set((state) => {
          if (state.analysisProgress >= 85) {
            clearInterval(progressTimer);
            return { analysisProgress: 90 };
          }
          return { analysisProgress: state.analysisProgress + 20 };
        });
      }, 500);

      const response = await api.uploadTender(formData);
      clearInterval(progressTimer);

      set({
        isAnalyzing: false,
        analysisProgress: 100,
        extractedTender: response.data,
        currentStep: 2, // Advance to step 2: List Documents
      });

      // Do NOT fetch tenders here: tender is only officially registered upon Phase 5 confirmation
      return response.data;
    } catch (error) {
      set({
        isAnalyzing: false,
        analysisProgress: 0,
        uploadError: error.message || 'Failed to analyze tender document with Gemini AI',
      });
      throw error;
    }
  },

  confirmAndRegisterTender: async () => {
    const { extractedTender } = get();
    if (!extractedTender || !extractedTender.tender) {
      throw new Error('No tender dossier available for registration.');
    }

    const payload = {
      tender: extractedTender.tender,
      rawAnalysis: extractedTender.rawAnalysis,
    };

    const response = await api.registerTender(payload);

    set({
      extractedTender: {
        ...extractedTender,
        tender: response.data,
        isRegistered: true,
      }
    });

    // Officially refresh active procurement registry now that Phase 5 is completed
    get().fetchTenders();
    return response.data;
  },

  resetUploadFlow: () => set({
    currentStep: 1,
    uploadedFile: null,
    isAnalyzing: false,
    analysisProgress: 0,
    extractedTender: null,
    uploadError: null,
  }),

  fetchTenders: async () => {
    set({ isLoadingTenders: true, tendersError: null });
    try {
      const res = await api.getAllTenders();
      set({ tenders: res.data || [], isLoadingTenders: false });
    } catch (err) {
      set({ tendersError: err.message, isLoadingTenders: false });
    }
  },
}));

export default useTenderStore;
