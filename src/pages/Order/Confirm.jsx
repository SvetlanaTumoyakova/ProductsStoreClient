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

    const calculateTotalPrice = () => {
        if (!cart || !cart.products) return 0;

        return cart.products.reduce((total, product) => {
            return total + product.price;
        }, 0);
    };
    const totalPrice = calculateTotalPrice();

    return (
        <div>
            <h1>Оформление заказа</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {!cart ? (
                <p>Загрузка...</p>
            ) : cart.products.length > 0 ? (
                <>
                    {cart.products.map((product) => (
                        <div className="flex align-content-center mt-3 mb-3" key={product.id}>
                            <span className="product-name flex-grow-1 me-3">{product.name}</span>
                            <span className="product-price">
                                {product.price.toLocaleString()} ₽
                            </span>
                        </div>
                    ))}

                    <div className="total-price mt-4 p-3 bg-light rounded text-end w-50">
                        <strong>Итоговая сумма заказа:</strong>
                        <span className="fs-4 ms-2">{totalPrice.toLocaleString()} ₽</span>
                    </div>

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