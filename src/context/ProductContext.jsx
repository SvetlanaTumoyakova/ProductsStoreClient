import { createContext, useState } from 'react';

const ProductContext = createContext();
function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const apiUrl = "https://localhost:7124/api/product";

    const fetchProducts = async (id) => {
        const result = {}
        try {
            setLoading(true);
            let urlstring = `${apiUrl}`;
            if (id) {
                urlstring = `${apiUrl}?category_id=${id}`;
            }
            const response = await fetch(urlstring, {
                method: 'GET',
            });
            const data = await response.json();
            result.data = data;
        } catch (error) {
            result.error = "Ошибка получения продуктов: " + error.message
        } finally {
            setLoading(false);
        }
        return result;
    };

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

    const fetchSearchProducts = async (search, id) => {
        const result = {};
        try {
            setLoading(true);
            let urlstring = `${apiUrl}/search?q=${search}`;
            if (id) {
                urlstring = `${apiUrl}/search?q=${search}&category_id=${id}`;
            }

            const response = await fetch(urlstring, {
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

    const fetchProductsCategories = async () => {
        const result = {}
        try {
            const response = await fetch(`${apiUrl}/categories`, {
                method: 'GET',
            });
            const data = await response.json();
            result.data = data;
        } catch (error) {
            result.error = "Ошибка получения продуктов: " + error.message
        }
        console.log('res', result)
        return result;
    };

    return (
        <ProductContext.Provider value={{ products, loading, error, fetchRandomProducts, fetchProductDetails, fetchSearchProducts, fetchProductsCategories, fetchProducts }}>
            {children}
        </ProductContext.Provider>
    );

}

export { ProductContext, ProductProvider };