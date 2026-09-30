'use client';

import { Toaster, toast } from 'sonner';

export function ToastProvider({ children }) {
  return (
    <>
      {children}
      <Toaster richColors position="bottom-right" closeButton />
    </>
  );
}

export const useToast = () => ({
  showToast: (message, type = 'info') => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'warning':
        toast.warning(message);
        break;
      default:
        toast.info(message);
        break;
    }
  },
  toast,
});

export default ToastProvider;
