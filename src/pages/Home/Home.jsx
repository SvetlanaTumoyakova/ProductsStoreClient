import { useState, useContext, useEffect } from 'react';
import { ProductContext } from "../../context/ProductContext";

import ProductList from "../../components/ProductList";

function Home() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [search, setSearch] = useState("");
    const { fetchRandomProducts, fetchSearchProducts, loading } = useContext(ProductContext);

    useEffect(() => {
        async function fetchProducts() {
            const { data, error } = await fetchRandomProducts();
            if (data) {
                setProducts(data);
            }
            if (error) {
                setError(error);
            }
        }

        fetchProducts();
    }, []);

    async function handleSearch() {
        const { data, error } = await fetchSearchProducts(search);
        if (data) {
            setProducts(data);
        }
        if (error) {
            setError(error);
        }
    }

    return (
        <div>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="d-flex p-2 bd-highlight align-items-center my-3 ">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Введите название продукта..."
                    className="form-control w-50"
                />
                <button onClick={handleSearch} className="btn btn-outline-success ms-3">
                    Найти
                </button>
            </div>
            <ProductList products={products} loading={loading} />
        </div>
    );
}

export default Home;