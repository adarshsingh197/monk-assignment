import React, { createContext, useContext, useState } from "react";

const ModalContext = createContext();
export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const modalStateTrigger = (id, modalState) => {
        setIsModalOpen(v => !v);
    }

    return (
        <ModalContext.Provider value={{ isModalOpen, setIsModalOpen, modalStateTrigger }}>
            {children}
        </ModalContext.Provider>
    );
};

