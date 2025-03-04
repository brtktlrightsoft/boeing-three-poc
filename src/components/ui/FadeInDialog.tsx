import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface FadeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function FadeDialog({ isOpen, onClose, children }: FadeDialogProps) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      // Delay the fade-in to ensure mount is complete
      const showTimer = setTimeout(() => {
        setIsVisible(true);
      }, 100);
      return () => clearTimeout(showTimer);
    } else {
      setIsVisible(false);
      const hideTimer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(hideTimer);
    }
  }, [isOpen]);

  // Force initial state to be invisible
  useEffect(() => {
    if (!mounted) {
      setIsVisible(false);
    }
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <div
      onClick={onClose}
      className={`fixed z-[999] inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-[300ms] ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}