import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { register, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (isAuthenticated) {
            console.log("сработал isAuthenticated");
            navigate("/");
        }
    }, [isAuthenticated]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username.trim() && email.trim() && password.trim()) {
            try {
                await register({ username, email, password });
                navigate("/");
            } catch (error) {
                setError(error.message || "Ошибка регистрации. Пожалуйста, попробуйте позже.");
            }
        } else {
            setError("Все поля обязательны для заполнения.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="form-group my-3">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Введите имя пользователя..."
                    className="form-control"
                />
            </div>
            <div className="form-group my-3">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Введите email..."
                    className="form-control"
                />
            </div>
            <div className="form-group my-3">
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите пароль..."
                    className="form-control"
                />
            </div>
            <button type="submit" className="btn btn-outline-success mt-3">
                Зарегистрироваться
            </button>
            <Link to="/login" className="btn btn-secondary mt-3 ms-4">Уже есть аккаунт</Link>
        </form>
    );
}

export default Register;