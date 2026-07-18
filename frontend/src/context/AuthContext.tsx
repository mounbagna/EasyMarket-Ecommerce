"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
    id: number;
    firstname?: string;
    lastname?: string;
    email: string;
    role: string;
}

type AuthContextType = {
    user: User | null;
    login: (user: User, token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
    children,
} : {
    children: ReactNode;
}) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");

        if(savedUser){
            try {
                setUser(JSON.parse(savedUser));
            }catch(error){
                console.error("Invalid user data in localstorage",error);
                localStorage.removeItem("user")
            }
            
        }
    }, []);

    const login = (userData: User,token: string) => {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
        }
    
    const logout = () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
        }

        return (
            <AuthContext.Provider value={{user, login, logout, isAuthenticated: !!user}}>
                {children}
            </AuthContext.Provider>
        )
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }
    return context;
}