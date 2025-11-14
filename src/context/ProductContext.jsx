import { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();
function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const apiUrl = "https://localhost:7124/api/product";

    const fetchRandomProducts = async () => {
        const result = {}
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/random`, {
                method: 'GET',
            });
            const data = await response.json();
            result.data = data;
        } catch (error) {
            result.error = "Ошибка получения продуктов: " + error.message
        } finally {
            setLoading(false);
        }
        console.log('res', result)
        return result;
    };

    const fetchProductDetails = async (id) => {
        const result = {}
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error("Продукт не найден!");
            }
            const data = await response.json();
            result.data = data;
        } catch (error) {
            result.error = "Ошибка получения данных продукта: " + error.message
        } finally {
            setLoading(false);
        }
        return result;
    }

    const fetchSearchProducts = async (search) => {
        const result = {};
        try {
            setLoading(true);
            const response = await fetch(`${apiUrl}/search?q=${search}`, {
                method: 'GET'
            });
            if (!response.ok) {
                throw new Error("Продукт не найден!");
            }
            const data = await response.json();
            result.data = data;
        } catch (error) {
            result.error = "Ошибка получения продуктов: " + error.message
        } finally {
            setLoading(false);
        }
        return result;
    }

    return (
        <ProductContext.Provider value={{ products, loading, error, fetchRandomProducts, fetchProductDetails, fetchSearchProducts }}>
            {children}
        </ProductContext.Provider>
    );

}

export { ProductContext, ProductProvider };