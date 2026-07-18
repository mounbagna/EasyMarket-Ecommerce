import React, { createContext, useContext, useState } from "react";

interface AdminSidebarModalContextType {
  isAdminSidebarModalOpen: boolean;
  openAdminSidebarModal: () => void;
  closeAdminSidebarModal: () => void;
}

const AdminSidebarModalContext = createContext<AdminSidebarModalContextType | undefined>(
  undefined
);

export const useAdminSidebarContext = () => {
  const context = useContext(AdminSidebarModalContext);
  if (!context) {
    throw new Error("useAdminSidebarModalContext must be used within a ModalProvider");
  }
  return context;
};

export const AdminSidebarModalProvider = ({ children }) => {
  const [isAdminSidebarModalOpen, setIsAdminSidebarModalOpen] = useState(false);

  const openAdminSidebarModal = () => {
    setIsAdminSidebarModalOpen(true);
  };

  const closeAdminSidebarModal = () => {
    setIsAdminSidebarModalOpen(false);
  };

  return (
    <AdminSidebarModalContext.Provider
      value={{ isAdminSidebarModalOpen, openAdminSidebarModal, closeAdminSidebarModal }}
    >
      {children}
    </AdminSidebarModalContext.Provider>
  );
};
