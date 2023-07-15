import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import Category from "./components/Category";
import WishListPage from "./pages/WishListPage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Login />} />
        <Route path="/" element={<HomePage />}>
          <Route path=":category" element={<Category />} />
        </Route>
        <Route path="/wishList" element={<WishListPage />} />
        <Route path="/carts" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
