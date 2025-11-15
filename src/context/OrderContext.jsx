import { createContext, useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

const OrderContext = createContext();

function OrderProvider({ children }) {
    const [orders, setOrders] = useState();
    const [error, setError] = useState('');
    const { isAuthenticated } = useContext(AuthContext);

    const apiUrl = "https://localhost:7124/api/order";

    useEffect(() => {
        if (isAuthenticated) {
            fetchOrder();
        }
    }, [isAuthenticated]);

    const fetchOrder = async () => {
        try {
            const response = await fetch(`${apiUrl}`, {
                method: 'GET',
                headers:
                {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            setError("Ошибка получения корзины: " + error.message);
        }
    }

    const fetchAddToOrder = async () => {
        try {
            await fetch(`${apiUrl}`, {
                method: 'POST',
                headers:
                {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            fetchOrder();
        }
        catch (error) {
            setError("Ошибка получения корзины: " + error.message);
        }
    }

    return (
        <OrderContext.Provider
            value={{ orders, error, fetchOrder, fetchAddToOrder }}
        >
            {children}
        </OrderContext.Provider>
    );
}

export { OrderContext, OrderProvider };