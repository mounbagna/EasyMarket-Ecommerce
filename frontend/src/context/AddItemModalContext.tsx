import { createContext, useContext, useState } from "react";

interface ModalContextType {
  isModalOpen: boolean;
  openAddItemModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useAddItemModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useAddItemModalContext must be used within a ModalProvider");
  }
  return context;
};

export const AddItemModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openAddItemModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openAddItemModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}; 