import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage"; // <== IMPORT
import LoginPage from "./pages/LoginPage"; // <== IMPORT
import IsPrivate from "./components/IsPrivate"; // <== IMPORT
import IsAnon from "./components/IsAnon"; // <== IMPORT
import ItemCard from "./components/ItemCard";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import Cart from "./pages/Cart";
import Java from "./Categories/Java";
import Javascript from "./Categories/Javascript";
import Python from "./Categories/Python";
import Shop from "./pages/Shop";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />{" "}
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
        <Route path="/item/:itemId" element={<ItemDetailsPage />} />
        <Route path="/user/:userId" element={<Cart />} />
        <Route path="/javascript" element={<Javascript />} />
        <Route path="/python" element={<Python />} />
        <Route path="/java" element={<Java />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </div>
  );
}

export default App;
