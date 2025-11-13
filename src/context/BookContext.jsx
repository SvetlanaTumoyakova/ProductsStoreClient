import { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from "./AuthContext";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useContext(AuthContext);

    const apiUrl = "http://localhost:5174";

    useEffect(() => {
        if (isAuthenticated) {
            fetchBooks();
        }

    }, [isAuthenticated]);

    const fetchBooks = async () => {
        try {
            const response = await fetch(`${apiUrl}/books`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            setError("Error fetching books: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchBookDetails = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/books/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error("Book not found");
            }

            return await response.json();
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const removeBook = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/books/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error("Error deleting book");
            }

            setBooks((prevBooks) => {
                const filtered = prevBooks.filter(book => book.id !== parseInt(id))
                console.log(filtered, id)
                return filtered;
            });

        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const addBook = async (createBook) => {
        try {
            const response = await fetch(`${apiUrl}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(createBook)
            });

            if (!response.ok) {
                throw new Error("Error creating book");
            }

            const createData = await response.json();
            setBooks((prevBooks) =>
                [...prevBooks, createData]
            );
            return createData;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const editBook = async (id, updatedBook) => {
        try {
            const response = await fetch(`${apiUrl}/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updatedBook)
            });

            if (!response.ok) {
                throw new Error("Error updating book");
            }

            const updatedData = await response.json();
            setBooks((prevBooks) =>
                prevBooks.map(book => (book.id === id ? { ...book, ...updatedBook } : book))
            );
            return updatedData;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    return (
        <BookContext.Provider value={{ books, error, fetchBooks, fetchBookDetails, removeBook, addBook, editBook }}>
            {children}
        </BookContext.Provider>
    );
};

export default BookProvider;