"use client";

import EditItemModal from "./EditItemModal";
import {useEditItemModalContext} from "@/context/EditItemModalContext"

const ModalManager = () => {
    const {isModalOpen, product, closeEditModal} = useEditItemModalContext();

    return (
        <>
        {
            isModalOpen && product && (
                <EditItemModal
                product={product}
                onClose={closeEditModal}
                />
            )
        }
        </>
    )
}

export default ModalManager;