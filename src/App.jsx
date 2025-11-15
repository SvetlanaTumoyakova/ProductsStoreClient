import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import ProductDetails from "./pages/Product/ProductDetails";
import Cart from "./pages/Cart/Cart";
import Confirm from "./pages/Order/Confirm";
import Orders from "./pages/Order/OrderList";
import Category from "./pages/Category/Category";

import Header from "./components/Header";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
function App() {
    return (
        <Router>
            <AuthProvider>
                <ProductProvider>
                    <CartProvider>
                        <OrderProvider>
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
                                    <Route
                                        path="/category/:id"
                                        element={
                                            <Category />
                                        }
                                    />


                                    <Route
                                        path="/cart"
                                        element={
                                            <ProtectedRoute>
                                                <Cart />
                                            </ProtectedRoute>
                                        }
                                    />

                                    <Route
                                        path="/confirm"
                                        element={
                                            <ProtectedRoute>
                                                <Confirm />
                                            </ProtectedRoute>
                                        }
                                    />

                                    <Route
                                        path="/orders"
                                        element={
                                            <ProtectedRoute>
                                                <Orders />
                                            </ProtectedRoute>
                                        }
                                    />

                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />

                                </Routes>
                            </div>
                        </OrderProvider>
                    </CartProvider>
                </ProductProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;