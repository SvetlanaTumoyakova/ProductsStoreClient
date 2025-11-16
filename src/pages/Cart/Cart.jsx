import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from "../../context/CartContext";

function Cart() {
    const { cart, error, fetchDeleteFromCart, fetchClearCart } = useContext(CartContext);

    return (
        <div>
            <h1>Корзина</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {!cart ? (
                <p>Загрузка...</p>
            ) : cart.products.length > 0 ? (
                <>
                    {cart.products.map((product) => (
                        <div className="flex align-content-center mb-3" key={product.id}>
                            <span className="product-name flex-grow-1 me-3">{product.name}</span>
                            <span className="product-price me-3">
                                {product.price.toLocaleString()} ₽
                            </span>
                            <button type="button" onClick={() => fetchDeleteFromCart(product.id)} className="btn btn-outline-success">
                                Удалить из корзины
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={() => fetchClearCart()} className="btn btn-outline-success mt-3 me-3">
                        Очистить корзину
                    </button>
                    <Link to={`/confirm`} className="btn btn-primary mt-3">Оформить заказ</Link>
                </>
            ) : (
                <p>Нет добавленных товаров.</p>
            )}
        </div>);
}

export default Cart;