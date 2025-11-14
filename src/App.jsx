import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/Product/ProductDetails";

import Header from "./components/Header";
function App() {
    return (
        <Router>
            <AuthProvider>
                <ProductProvider>
                    <Header />
                    <div className="container my-5">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Home />
                                }
                            />
                            <Route
                                path="/:id"
                                element={
                                    <ProductDetails />
                                }
                            />

                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </div>
                </ProductProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;