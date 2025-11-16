import { NavLink, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";

function Header() {
    const { currentUser, isAuthenticated, logout } = useContext(AuthContext);
    const { fetchProductsCategories } = useContext(ProductContext);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    useEffect(() => {
        async function fetchCategories() {
            const { data, error } = await fetchProductsCategories();
            if (data) {
                setCategories(data);
            }
            if (error) {
                setError(error);
            }
        }

        fetchCategories();
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="dropdown m-3">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuCategory" data-bs-toggle="dropdown" aria-expanded="false">
                    Категории
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    {categories.map(category => (
                        <li key={category.id}>
                            <Link className="dropdown-item text-decoration-none" to={`/category/${category.id}`}>{category.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="container">
                <a className="navbar-brand" href="#">
                    Онлайн магазин
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav w-100 mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link me-5" to="/">
                                Список товаров
                            </NavLink>
                        </li>
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link ms-auto" to="/cart">
                                        Корзина
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink className="nav-link" to="/orders">
                                        Заказы
                                    </NavLink>
                                </li>
                                <li className="nav-item ms-auto dropdown">
                                    <button
                                        className="btn btn-dark dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {currentUser.userName}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-lg-end dropdown-menu-dark">
                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className="dropdown-item bg-danger"
                                            >
                                                Выход
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item ms-lg-auto">
                                    <NavLink className="nav-link" to="/login">
                                        Вход
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/register">
                                        Регистрация
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;