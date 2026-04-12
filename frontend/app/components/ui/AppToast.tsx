import { Toast, ToastContainer } from 'react-bootstrap';

export type ToastVariant = 'success' | 'warning' | 'danger' | 'info';

interface AppToastProps {
  show: boolean;
  message: string;
  variant: ToastVariant;
  onClose: () => void;
}

export const AppToast = ({ show, message, variant, onClose }: AppToastProps) => {
  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
      <Toast show={show} onClose={onClose} delay={3000} autohide bg={variant}>
        <Toast.Header closeButton={true}>
          <strong className="me-auto">
            {variant.charAt(0).toUpperCase() + variant.slice(1)}
          </strong>
        </Toast.Header>
        <Toast.Body className={variant === 'info' ? 'text-dark' : 'text-white'}>
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};
