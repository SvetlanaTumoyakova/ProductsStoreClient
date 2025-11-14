import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();

    const isAuthenticated = Boolean(currentUser);

    const navigate = useNavigate();
    const apiUrl = "https://localhost:7124/api/Auth";

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getUser();
        }

    }, []);

    const register = async ({ email, password, lastName, firstName, patronymic, address, phone }) => {
        const response = await fetch(`${apiUrl}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userName: email, password, lastName, firstName, patronymic, address, phone }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Ошибка регистрации");
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        await getProfile();
    };

    const login = async ({ email, password }) => {
        const response = await fetch(`${apiUrl}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ userName: email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Ошибка входа");
        }

        const data = await response.json();
        localStorage.setItem("token", data.token);
        await getProfile();
    };

    const getUser = async () => {
        const token = localStorage.getItem("token");
        const response = await fetch(`${apiUrl}/profile`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            localStorage.removeItem("token");
            const errorData = await response.json();
            throw new Error(errorData.message || "Ошибка входа");
        }

        const data = await response.json();
        setCurrentUser(data);

        navigate("/");
    };


    const logout = () => {
        setCurrentUser(null);
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