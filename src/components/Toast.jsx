import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useToastStore } from '../store/toastStore';

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast 
          key={toast.id} 
          toast={toast} 
          onClose={() => removeToast(toast.id)} 
        />
      ))}
    </div>
  );
}

function Toast({ toast, onClose }) {
  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle size={18} style={{ color: 'var(--accent)' }} />;
      case 'error':
        return <AlertCircle size={18} style={{ color: 'var(--danger)' }} />;
      default:
        return <Info size={18} style={{ color: 'var(--primary)' }} />;
    }
  };

  return (
    <div className={`toast toast-${toast.type}`} role="alert">
      {getIcon()}
      <div className="toast-message">{toast.message}</div>
      <button type="button" className="toast-close" onClick={onClose} aria-label="Close notification">
        <X size={16} />
      </button>
    </div>
  );
}
