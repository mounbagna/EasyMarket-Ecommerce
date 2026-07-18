import { Product } from "@/types/product";
import { createContext, useContext, useState } from "react";

interface ModalContextType {
  isModalOpen: boolean;
  product: Product | null;
  openEditItemModal: (product:Product) => void;
  closeEditModal: () => void;
}

const EditItemModalContext = createContext<ModalContextType | undefined>(undefined);

export const useEditItemModalContext = () => {
  const context = useContext(EditItemModalContext);
  if (!context) {
    throw new Error("useEditItemModalContext must be used within a ModalProvider");
  }
  return context;
};

export const EditItemModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openEditItemModal = (selectedProduct: Product) => {
    setProduct(selectedProduct)
    setIsModalOpen(true);
  };
  const [product, setProduct] = useState<Product | null>(null);
  const closeEditModal = () => {
    setIsModalOpen(false);
  };

  return (
    <EditItemModalContext.Provider value={{ isModalOpen,product, openEditItemModal, closeEditModal }}>
      {children}
    </EditItemModalContext.Provider>
  );
}; 