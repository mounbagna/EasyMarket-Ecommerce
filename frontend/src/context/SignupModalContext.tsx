import React, { createContext, useContext, useState } from "react";

interface ModalContextType {
  isModalOpen: boolean;
  openSignupModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useSignupModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useSignupModalContext must be used within a ModalProvider");
  }
  return context;
};

export const SignupModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openSignupModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openSignupModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
}; 