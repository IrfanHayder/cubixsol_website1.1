import { createContext, useContext, useState } from 'react';
import FreeEstimateModal from '../components/FreeEstimateModal';

const EstimateModalContext = createContext(null);

export function EstimateModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const openEstimateModal = () => setIsOpen(true);
  const closeEstimateModal = () => setIsOpen(false);

  return (
    <EstimateModalContext.Provider value={{ isOpen, openEstimateModal, closeEstimateModal }}>
      {children}
      <FreeEstimateModal isOpen={isOpen} onClose={closeEstimateModal} />
    </EstimateModalContext.Provider>
  );
}

export function useEstimateModal() {
  const ctx = useContext(EstimateModalContext);
  if (!ctx) {
    throw new Error('useEstimateModal must be used within an EstimateModalProvider');
  }
  return ctx;
}
