import { useContext } from 'react';
import { BookContext } from '../../context/BookContext';
import BookItem from './BookItem';
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

function BookList() {
    const { books, loading } = useContext(BookContext);
    const { currentUser } = useContext(AuthContext);
    const isAdmin = currentUser && currentUser.role === 'admin';

    return (
        <div className="container">
               {isAdmin && (
                <Link to="/create" className="btn btn-primary mb-3">Добавить новую книгу</Link>
            )}
           <div className="row">
                {loading ? (
                    <p>Загрузка...</p>
                ) : books.length > 0 ? (
                    books.map((book) => (
                        <div className="col-md-4 mb-3" key={book.id}>
                            <BookItem book={book} />
                        </div>
                    ))
                ) : (
                    <p>Нет добавленных книг.</p>
                )}
            </div>
        </div>
    );
}

export default BookList;