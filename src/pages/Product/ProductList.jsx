import ProductCard from "./ProductCard";

const ProductList = ({ products, loading }) => {
    return (
        <div className="container">
            <div className="row">
                {loading ? (
                    <p>Загрузка...</p>
                ) : products.length > 0 ? (
                    products.map((product) => (
                        <div className="col-md-4 mb-3" key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))
                ) : (
                    <p>Нет добавленных товаров.</p>
                )}
            </div>
        </div>
    );
}

export default ProductList;