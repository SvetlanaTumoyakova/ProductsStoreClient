import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const [error, setError] = useState(null);

    const { register } = useContext(AuthContext);


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email.trim() && password.trim() && lastName.trim() && firstName.trim() && patronymic.trim(), address.trim(), phone.trim()) {
            try {
                await register({ email, password, lastName, firstName, patronymic, address, phone });
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

            <div className="form-group my-3">
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Введите фамилию..."
                    className="form-control"
                />
            </div>

            <div className="form-group my-3">
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Введите имя..."
                    className="form-control"
                />
            </div>

            <div className="form-group my-3">
                <input
                    type="text"
                    value={patronymic}
                    onChange={(e) => setPatronymic(e.target.value)}
                    placeholder="Введите отчество..."
                    className="form-control"
                />
            </div>

            <div className="form-group my-3">
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Введите адрес..."
                    className="form-control"
                />
            </div>

            <div className="form-group my-3">
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Введите номер телефона..."
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