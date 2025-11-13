import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem("currentUser");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const savedStatus = localStorage.getItem("status");
        return savedStatus ? JSON.parse(savedStatus) : false;
    });

    const [isRegistered, setIsRegistered] = useState(() => {
        const userRegistered = localStorage.getItem("userRegistered");
        return userRegistered ? true : false;
    });

    const navigate = useNavigate();
    const apiUrl = "http://localhost:5174";

    useEffect(() => {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }, [currentUser]);

    useEffect(() => {
        localStorage.setItem("status", JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    const register = async ({ username, email, password }) => {
        const response = await fetch(`${apiUrl}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Ошибка регистрации");
        }

        const loginResponse = await fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (!loginResponse.ok) {
            const errorData = await loginResponse.json();
            throw new Error(errorData.message || "Ошибка входа после регистрации");
        }

        const data = await loginResponse.json();
        setCurrentUser(data.user);
        setIsAuthenticated(true);
        setIsRegistered(true);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userRegistered", true);
        navigate("/");
    };

    const login = async ({ username, email, password }) => {
        const response = await fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Ошибка входа");
        }

        const data = await response.json();
        setCurrentUser(data.user);
        console.log("data.user:", data.user);
        setIsAuthenticated(true);
        localStorage.setItem("token", data.token);
        navigate("/");
    };

    const logout = () => {
        setCurrentUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider
            value={{ currentUser, isAuthenticated, register, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };