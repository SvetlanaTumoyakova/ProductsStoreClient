import { useState, useContext } from 'react';
import { BookContext } from '../../context/BookContext';
import { useNavigate } from 'react-router-dom'; 

function BookCreate() {
    const { addBook } = useContext(BookContext);
    const [book, setBook] = useState({
        title: "",
        author: "",
        genre: "",
        description: ""
    });
    const navigate = useNavigate(); 

    const [error, setError] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setBook(({ ...book, image: reader.result }));
            };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (book.title.length < 3) {
            setError("Название должно содержать минимум 3 символа.");
            return;
        }
        if (book.author.length < 3) {
            setError("Автор должен содержать минимум 3 символа.");
            return;
        }
        if (book.genre.length < 3) {
            setError("Жанр должен содержать минимум 3 символа.");
            return;
        }
        if (book.description.length < 10) {
            setError("Описание должно содержать минимум 10 символов.");
            return;
        }
        if (!book.image) {
            setError("Пожалуйста, загрузите изображение.");
            return;
        }

        try {
            await addBook(book);
            setBook({
                title: "",
                author: "",
                genre: "",
                description: ""
            });
            navigate(`/`);
        } catch (error) {
            console.log(error);
            setError("Ошибка при добавлении книги. Пожалуйста, попробуйте еще раз.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="mb-3">
                <input type="text" className="form-control" placeholder="Название" value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} required />
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" placeholder="Автор" value={book.author} onChange={(e) => setBook({...book, author: e.target.value})} required />
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" placeholder="Жанр" value={book.genre} onChange={(e) => setBook({...book, genre: e.target.value})} required />
            </div>
            <div className="mb-3">
                <textarea className="form-control" placeholder="Описание" value={book.description} onChange={(e) => setBook({...book, description: e.target.value})} required />
            </div>
            <div className="mb-3">
                <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
            </div>
            <button type="submit" className="btn btn-primary">Сохранить изменения</button>
        </form>
    );
}

export default BookCreate;