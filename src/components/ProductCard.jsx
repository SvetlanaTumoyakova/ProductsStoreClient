import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const apiUrl = "https://localhost:7124";

    return (
        <Link to={`/${product.id}`} className="text-decoration-none">
            <div className="product-card">
                {product.imageUrl && (
                    <img
                        src={apiUrl + "/" + product.imageUrl}
                        alt={product.name}
                        className="product-image mt-3"
                    />
                )}
                <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">
                        {product.price.toLocaleString()} ₽
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;