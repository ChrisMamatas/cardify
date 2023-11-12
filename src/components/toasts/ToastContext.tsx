// ToastContext.tsx
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import BattleRequestToast from './BattleRequestToast';
import { BattleProvider, useBattle } from '../../context/BattleContext';
import { auth } from "../../../firebaseConfig";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { BattleContextType } from '../../@types/battleSession';


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


const HandleAccept = (battleSessionId: string, navigate: NavigateFunction, battleContext: BattleContextType | null) => {
    auth.onAuthStateChanged(async (user) => {
        if (user) {
            fetch("http://localhost:8080/battle/confirm/" + battleSessionId, {
                method: 'POST',
                body: JSON.stringify({ confirmed: true }),
                headers: {
                    "Authorization": "Bearer " + await auth.currentUser?.getIdToken(),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    }
                    else {
                        console.log(response)
                        throw new Error()
                    }
                })
                .then((data) => {
                    console.log(data)
                    battleContext?.saveBattleSession(data)
                    navigate('/BattleSelector')
                })
                .catch((e) => alert(e))
        }
    });
}

export const useToast = () => useContext(ToastContext);



export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastData[]>([]);

    const navigate = useNavigate()
    const battleSession = useBattle()

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
                    onAccept={() => {
                        HandleAccept(toast.battleSessionId, navigate, battleSession)
                        removeToast(toast.id)
                    }}
                    onDecline={() => removeToast(toast.id)}
                />
            ))}
        </ToastContext.Provider>
    );
};
