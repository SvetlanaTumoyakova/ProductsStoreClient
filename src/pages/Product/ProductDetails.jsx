import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from "../../context/ProductContext";
import { useContext } from 'react';


function ProductDetails() {
    const [product, setProduct] = useState();
    const { id } = useParams();
    const { fetchProductDetails, loading } = useContext(ProductContext);

    useEffect(() => {
        async function fetchProduct() {
            const { data } = await fetchProductDetails(id);
            console.log(data);
            if (data) {
                setProduct(data);
            }
        }
        fetchProduct();
    }, []);

    return (
        <div className="product-card">
            {!product || loading ? (
                <p>Загрузка...</p>
            ) : (
                <>
                    <div className="product-category">
                        <h3 className="product-category">{product.categoryID}</h3>
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
                </>
            )}
        </div>
    );
}

export default ProductDetails;