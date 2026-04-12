import { createContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { AppToast } from '../components/ui/AppToast';
import type { ToastVariant } from '../components/ui/AppToast';

interface ToastContextType {
  showToast: (message: string, variant: ToastVariant) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [variant, setVariant] = useState<ToastVariant>('info');

  const showToast = useCallback((msg: string, v: ToastVariant) => {
    setMessage(msg);
    setVariant(v);
    setShow(true);
  }, []);

  const handleClose = () => setShow(false);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <AppToast
        show={show}
        message={message}
        variant={variant}
        onClose={handleClose}
      />
    </ToastContext.Provider>
  );
}