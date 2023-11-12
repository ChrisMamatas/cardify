// ToastContext.tsx
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import BattleRequestToast from './BattleRequestToast';
import { BattleProvider } from '../../context/BattleContext';

interface ToastData {
    id: string;
    message: string;
    senderUid: string;
    senderUsername: string;
    battleSessionId: string;
}

interface ToastProviderProps {
    children: ReactNode;
}

interface ToastContextProps {
    addBattleRequestToast: (data: Omit<ToastData, 'id'>) => void;
}

const ToastContext = createContext<ToastContextProps>({
    addBattleRequestToast: () => { }
});

export const useToast = () => useContext(ToastContext);



export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastData[]>([]);


    const addBattleRequestToast = useCallback((data: Omit<ToastData, 'id'>) => {
        console.log("Creating battle request toast");
        const newToast: ToastData = { id: uuidv4(), ...data };
        setToasts(toasts => [...toasts, newToast]);
    }, []);

    const removeToast = (id: string) => {
        setToasts(toasts => toasts.filter(toast => toast.id !== id));
    };

    // Render the children and toast container here
    return (
        <ToastContext.Provider value={{ addBattleRequestToast }}>
            {children}
            {toasts.map(toast => (
                <BattleRequestToast
                    key={toast.id}
                    message={toast.message}
                    show={true}
                    onClose={() => removeToast(toast.id)}
                    onAccept={() => removeToast(toast.id)}
                    onDecline={() => removeToast(toast.id)}
                />
            ))}
        </ToastContext.Provider>
    );
};
