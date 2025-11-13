import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { BookContext } from '../../context/BookContext';
import { AuthContext } from "../../context/AuthContext";

function BookDetails() {
    const { id } = useParams();
    const { fetchBookDetails, removeBook, error } = useContext(BookContext);
    const { currentUser } = useContext(AuthContext);
    const isAdmin = currentUser && currentUser.role === 'admin';
    const [book, setBook] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getBookDetails = async () => {
            try {
                const bookDetails = await fetchBookDetails(id);
                setBook(bookDetails);
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };

        getBookDetails();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm("Вы уверены, что хотите удалить эту книгу?")) {
            try {
                await removeBook(id);
                navigate('/');
            } catch (error) {
                console.error("Error deleting book:", error);
                alert("Не удалось удалить книгу. Пожалуйста, попробуйте еще раз.");
            }
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

   return (
    <div className="container">
        {book ? (
            <>
                <h2>{book.title}</h2>
                <h4>{book.author}</h4>
                <p><strong>Жанр:</strong> {book.genre}</p>
                <p><strong>Описание:</strong> {book.description}</p>
                <img src={book.image} alt="обложка книги" />
                <div className="mt-3">
                    <Link to="/" className="btn btn-secondary me-2">Назад к списку книг</Link>
                     {isAdmin && (
                        <>
                            <Link to={`/edit/${book.id}`} className="btn btn-warning me-2">Редактировать</Link>
                            <button className="btn btn-danger" onClick={handleDelete}>Удалить</button>
                        </>
                    )}
                </div>
            </>
        ) : (
            <p>Загрузка...</p>
        )}
    </div>
);
}

export default BookDetails;