import { ProductContext } from "../../context/ProductContext";
import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import ProductList from "../../components/ProductList";

function Category() {
    const { id } = useParams();

    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [search, setSearch] = useState("");

    const { fetchProducts, fetchSearchProducts, loading } = useContext(ProductContext);

    useEffect(() => {
        async function fetchProduct() {
            const { data, error } = await fetchProducts(id);
            if (data) {
                setProducts(data);
            }
            if (error) {
                setError(error);
            }
        }
        fetchProduct();
    }, [id]);

    async function handleSearch() {
        const { data, error } = await fetchSearchProducts(search, id);
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

export default Category;