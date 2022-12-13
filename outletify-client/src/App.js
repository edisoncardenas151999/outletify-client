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
import Sell from "./components/Sell";
import Inventory from "./components/Inventory";
import Ruby from "./Categories/Ruby";
import Footer from "./components/Footer";
import ItemEdit from "./pages/ItemEdit";
import InventoryPage from "./pages/InventoryPage";

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
        <Route
          path="/user/:userId"
          element={
            <IsPrivate>
              <Cart />
            </IsPrivate>
          }
        />
        <Route path="/javascript" element={<Javascript />} />
        <Route path="/python" element={<Python />} />
        <Route path="/java" element={<Java />} />
        <Route path="/ruby" element={<Ruby />} />
        <Route path="/shop" element={<Shop />} />
        <Route
          path="/sell/:userId"
          element={
            <IsPrivate>
              <Sell />
            </IsPrivate>
          }
        />
        <Route
          path="/inventory/:userId"
          element={
            <IsPrivate>
              <Inventory />
            </IsPrivate>
          }
        />
        <Route
          path="/item/edit/:itemId/"
          element={
            <IsPrivate>
              <ItemEdit />
            </IsPrivate>
          }
        />
        <Route
          path="/inventoryPage/:itemId"
          element={
            <IsPrivate>
              <InventoryPage />
            </IsPrivate>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
