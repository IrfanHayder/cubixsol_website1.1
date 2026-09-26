import { createContext, useContext, useState } from 'react';
import FreeEstimateModal from '../components/FreeEstimateModal';

const EstimateModalContext = createContext(null);

export function EstimateModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContext, setModalContext] = useState(null);

  const openEstimateModal = (contextData = null) => {
    // If called directly via onClick={openEstimateModal}, prevent React SyntheticEvent from being stored
    const isSyntheticEvent = contextData && (contextData.nativeEvent || contextData._reactName || contextData.target || typeof contextData === 'function');
    setModalContext(!isSyntheticEvent && contextData ? contextData : null);
    setIsOpen(true);
  };
  const openModal = openEstimateModal;

  const closeEstimateModal = () => {
    setIsOpen(false);
    setModalContext(null);
  };
  const closeModal = closeEstimateModal;

  return (
    <EstimateModalContext.Provider
      value={{
        isOpen,
        openEstimateModal,
        openModal,
        closeEstimateModal,
        closeModal,
        modalContext,
      }}
    >
      {children}
      <FreeEstimateModal
        isOpen={isOpen}
        onClose={closeEstimateModal}
        initialContext={modalContext}
      />
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

