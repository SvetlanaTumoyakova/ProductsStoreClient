import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import { ProductContext } from "../../context/ProductContext";
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';


function ProductDetails() {
    const [product, setProduct] = useState();
    const [error, setError] = useState('');
    const { id } = useParams();
    const { fetchProductDetails, loading } = useContext(ProductContext);
    const { isAuthenticated } = useContext(AuthContext);
    const { fetchAddCart } = useContext(CartContext);

    useEffect(() => {
        async function fetchProduct() {
            const { data, error } = await fetchProductDetails(id);
            console.log(data);
            if (data) {
                setProduct(data);
            }
            if (error) {
                setError(error);
            }
        }
        fetchProduct();
    }, []);

    return (
        <div className="product-card">
            {error && <div className="alert alert-danger">{error}</div>}
            {!product || loading ? (
                <p>Загрузка...</p>
            ) : (
                <>
                    <div className="product-category">
                        <p className="product-category m-3">{product.category.title}</p>
                    </div>
                    {product.image && (
                        <img
                            src={product.image}
                            alt={product.name}
                            className="product-image"
                        />
                    )}
                    <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-price">
                            {product.price.toLocaleString()} ₽
                        </p>
                    </div>
                    {isAuthenticated &&
                        (<button type="button" onClick={() => fetchAddCart(product.id)} className="btn btn-outline-success m-3">
                            Добавить в корзину
                        </button>)
                    }
                </>
            )}
        </div>
    );
}

export default ProductDetails;