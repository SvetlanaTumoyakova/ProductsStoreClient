import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { OrderContext } from "../../context/OrderContext";

function Confirm() {
    const { cart, error, fetchClearCart } = useContext(CartContext);
    const { fetchAddToOrder } = useContext(OrderContext);
    const navigate = useNavigate();

    async function handleConfirmOrder() {
        await fetchAddToOrder();
        await fetchClearCart();
        navigate("/orders");
    }

    return (
        <div>
            <h1>Оформление заказа</h1>
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

                        </div>
                    ))}
                    <button type="button" onClick={handleConfirmOrder} className="btn btn-outline-success mt-3">
                        Подтвердить заказ
                    </button>
                </>
            ) : (
                <p>Нет добавленных товаров.</p>
            )}
        </div>);
}

export default Confirm;