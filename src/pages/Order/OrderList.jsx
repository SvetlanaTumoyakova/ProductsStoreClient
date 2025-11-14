import { useContext, useEffect } from 'react';
import { OrderContext } from "../../context/OrderContext";

function OrderList() {
    const { orders, error, fetchOrder } = useContext(OrderContext);

    useEffect(() => {
        fetchOrder();
    }, []);


    return (
        <div>
            <h1>Заказы</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {!orders ? (
                <p>Загрузка...</p>
            ) : orders.items.length > 0 ? (
                <>
                    {orders.items.map((order) => (
                        <div key={order.id}>
                            <h2>Заказ от {new Date(order.createdAt).toLocaleString()}</h2>
                            {order.products.map((product) => (
                                <div className="flex align-content-center mb-3" key={product.id}>
                                    <span className="product-name flex-grow-1 me-3">{product.name}</span>
                                    <span className="product-price me-3">
                                        {product.price.toLocaleString()} ₽
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))}
                </>
            ) : (<p>Нет заказов.</p>)}

        </div>);
}

export default OrderList;