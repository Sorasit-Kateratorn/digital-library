import { Modal, Button } from 'react-bootstrap';

interface ConfirmModalProps {
  show: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'primary' | 'danger' | 'success';
}

export const ConfirmModal = ({
  show,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "primary"
}: ConfirmModalProps) => {
  return (
    <Modal show={show} onHide={onCancel} centered backdrop="static" keyboard={false}>
      <Modal.Header closeButton={false} className="border-0 bg-dark text-light">
        <Modal.Title className="fw-bold">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-light py-3 border-0">
        <p className="m-0 fs-5 opacity-75">{message}</p>
      </Modal.Body>
      <Modal.Footer className="bg-dark border-0 pt-0">
        <Button 
          variant="outline-secondary" 
          onClick={onCancel} 
          className="rounded-pill px-4"
        >
          {cancelLabel}
        </Button>
        <Button 
          variant={variant} 
          onClick={onConfirm} 
          className="rounded-pill px-4"
        >
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
