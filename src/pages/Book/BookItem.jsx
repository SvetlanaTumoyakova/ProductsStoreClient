import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function BookItem({ book }) {
    useEffect(() => {
    }, [book.image]);

    return (
        <div className="card">
            <img src={book.image} className="card-img-top" alt="обложка книги" />
            <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                <Link to={`/details/${book.id}`} className="btn btn-primary">Подробнее</Link>
            </div>
        </div>
    );
}

export default BookItem;