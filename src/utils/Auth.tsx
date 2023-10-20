import React, { useState, useEffect } from "react";
import { auth } from "../../firebaseConfig.ts";
import {redirect} from "react-router-dom";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }: any) => {
    const [currentUser, setCurrentUser]:any = useState(null);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            console.log(user)
        });

    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
