import { createContext, useState, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';
import { ConfirmModal } from '../components/ui/ConfirmModal';

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'primary' | 'danger' | 'success';
}

interface ConfirmContextType {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

export const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [modalState, setModalState] = useState<{
    show: boolean;
    title: string;
    message: string;
    confirmLabel?: string;
    cancelLabel?: string;
    variant?: 'primary' | 'danger' | 'success';
  }>({
    show: false,
    title: "Are you sure?",
    message: "",
  });

  const resolver = useRef<(value: boolean) => void>(() => {});

  const confirm = useCallback((options: ConfirmOptions) => {
    setModalState({
      show: true,
      title: options.title || "Confirmation Required",
      message: options.message,
      confirmLabel: options.confirmLabel,
      cancelLabel: options.cancelLabel,
      variant: options.variant || "primary",
    });

    return new Promise<boolean>((resolve) => {
      resolver.current = resolve;
    });
  }, []);

  const handleConfirm = () => {
    setModalState((prev) => ({ ...prev, show: false }));
    resolver.current(true);
  };

  const handleCancel = () => {
    setModalState((prev) => ({ ...prev, show: false }));
    resolver.current(false);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <ConfirmModal
        show={modalState.show}
        title={modalState.title}
        message={modalState.message}
        confirmLabel={modalState.confirmLabel}
        cancelLabel={modalState.cancelLabel}
        variant={modalState.variant}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmContext.Provider>
  );
};
