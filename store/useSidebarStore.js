import { create } from 'zustand';

const useSidebarStore = create((set) => ({
  isOpen: false,
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => set({ isOpen: false }),
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useSidebarStore;
