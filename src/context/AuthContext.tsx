import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { auth } from "../../firebaseConfig.ts"

type User = firebase.User | null;

const AuthContext = createContext<User | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            setUser(authUser);
        });

        return () => unsubscribe();
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}
