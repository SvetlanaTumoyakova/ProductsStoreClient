import { useState, useContext, useEffect } from 'react';
import { ProductContext } from "../../context/ProductContext";

import ProductList from "../Product/ProductList";

function Home() {
    const [products, setProducts] = useState([]);
    const { fetchRandomProducts, loading } = useContext(ProductContext);

    useEffect(() => {
        async function fetchProducts() {
            const { data } = await fetchRandomProducts();
            console.log(data);
            if (data) {
                setProducts(data);
            }
        }

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Home Page</h1>
            <ProductList products={products} loading={loading} />
        </div>
    );
}

export default Home;