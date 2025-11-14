import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <Link to={`/${product.id}`} className="text-decoration-none">
            <div className="product-card">
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
            </div>
        </Link>
    );
};

export default ProductCard;