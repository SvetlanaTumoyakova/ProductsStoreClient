import { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";


const CartContext = createContext();


function CartProvider({ children }) {
    const [cart, setCart] = useState();
    const [error, setError] = useState('');
    const { isAuthenticated } = useContext(AuthContext);

    const apiUrl = "https://localhost:7124/api/cart";

    useEffect(() => {
        if (isAuthenticated) {
            fetchCart();
        }
    }, [isAuthenticated]);

    const fetchCart = async () => {
        try {
            const response = await fetch(`${apiUrl}`, {
                method: 'GET',
                headers:
                {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            const data = await response.json();
            setCart(data);
        } catch (error) {
            setError("Ошибка получения корзины: " + error.message);
        }
    }

    const fetchAddCart = async (productId) => {
        try {
            const response = await fetch(`${apiUrl}/${productId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
            });
            const data = await response.json();
            setCart(data);
        } catch (error) {
            setError("Ошибка добавления продукта в корзину: " + error.message);
        }
    }

    const fetchDeleteFromCart = async (productId) => {
        try {
            const response = await fetch(`${apiUrl}/${productId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            const data = await response.json();
            setCart(data);
        } catch (error) {
            setError("Ошибка удаления продукта из корзины: " + error.message);
        }
    }

    const fetchClearCart = async () => {
        try {
            const response = await fetch(`${apiUrl}/clear`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            const data = await response.json();
            setCart(data);
        } catch (error) {
            setError("Ошибка удаления продукта из корзины: " + error.message);
        }
    }

    return (
        <CartContext.Provider
            value={{ cart, error, fetchAddCart, fetchDeleteFromCart, fetchClearCart }}
        >
            {children}
        </CartContext.Provider>
    );
}

export { CartContext, CartProvider };