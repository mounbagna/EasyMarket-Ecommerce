import React, { createContext, useContext, useState } from "react";

interface ModalContextType {
  isModalOpen: boolean;
  openLoginModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useLoginModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};

export const LoginModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openLoginModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}; 