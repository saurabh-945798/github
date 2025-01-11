// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Slider from "./Components/Slider";
// import Six from "./Components/Six";
// import FoodGrid from "./Components/FoodGrid";
// import Footer from "./Components/Footer";
// import Cart from "./Components/Cart";
// import Pizza from "./Components/Pizza";
// import Payment from "./Components/Payment";
// import Admin from "./Components/Admin";
// import Menu from "./Components/Menu"; // Import the Menu Component
// import Checkout from "./Components/Track";
// import Bill from './Components/Bill'
// import Banner from "./Components/Banner";
// import Navbar from "./Components/Navbar";
// const App = () => {
//   const [cartItems, setCartItems] = useState([]); // State for managing cart items

//   // Function to handle adding items to the cart
//   const handleAddToCart = (item) => {
//     const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
//     if (existingItem) {
//       setCartItems(
//         cartItems.map((cartItem) =>
//           cartItem.id === item.id
//             ? { ...cartItem, qty: cartItem.qty + 1 }
//             : cartItem
//         )
//       );
//     } else {
//       setCartItems([...cartItems, { ...item, qty: 1 }]);
//     }
//   };

//   return (
//     <Router>
//       <div className="bg-gray-50 min-h-screen">
//         {/* Define application routes */}
//         <Routes>
//           {/* Home Page */}
//           <Route
//             path="/"
//             element={
//               <>
//               <Navbar />
//                 <Slider />
//                 <Six />
//                 <Banner />
//                 <FoodGrid onAddToCart={handleAddToCart} />
              
//               </>
//             }
//           />

//           {/* Pizza Page */}
//           <Route path="/pizza" element={<Pizza />} />

//           {/* Payment Page */}
//           <Route path="/payment" element={<Payment />} />

//           <Route path="/checkout" element={<Checkout />} />

//           {/* Admin Page */}
//           <Route path="/admin" element={<Admin />} />

//           <Route path="/bill" element={<Bill />} />

//           {/* Menu Page */}
//           <Route
//             path="/menu"
//             element={<Menu onAddToCart={handleAddToCart} />}
//           />
//         </Routes>

//         {/* Footer Component */}
//         <Footer />

//         {/* Floating Cart (always visible) */}
//         <Cart cartItems={cartItems} setCartItems={setCartItems} />
//       </div>
//     </Router>
//   );
// };

// export default App;




// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Slider from "./Components/Slider";
// import Six from "./Components/Six";
// import FoodGrid from "./Components/FoodGrid";
// import Footer from "./Components/Footer";
// import Cart from "./Components/Cart";
// import Pizza from "./Components/Pizza";
// import Payment from "./Components/Payment";
// import Admin from "./Components/Admin";
// import Menu from "./Components/Menu"; // Import the Menu Component
// import Checkout from "./Components/Track";
// import Bill from './Components/Bill'
// import Banner from "./Components/Banner";
// import Navbar from "./Components/Navbar";
// import AdminLogin from "./Components/Login"; // Import the AdminLogin Component
// const App = () => {
//   const [cartItems, setCartItems] = useState([]); // State for managing cart items

//   // Function to handle adding items to the cart
//   const handleAddToCart = (item) => {
//     const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
//     if (existingItem) {
//       setCartItems(
//         cartItems.map((cartItem) =>
//           cartItem.id === item.id
//             ? { ...cartItem, qty: cartItem.qty + 1 }
//             : cartItem
//         )
//       );
//     } else {
//       setCartItems([...cartItems, { ...item, qty: 1 }]);
//     }
//   };

//   return (
//     <Router>
//       <div className="bg-gray-50 min-h-screen">
//         {/* Define application routes */}
//         <Routes>
//           {/* Home Page */}
//           <Route
//             path="/"
//             element={
//               <>
//                 <Navbar />
//                 <Slider />
//                 <Six />
//                 <Banner />
//                 <FoodGrid onAddToCart={handleAddToCart} />
//               </>
//             }
//           />

//           {/* Pizza Page */}
//           <Route path="/pizza" element={<Pizza />} />

//           {/* Payment Page */}
//           <Route path="/payment" element={<Payment />} />

//           <Route path="/checkout" element={<Checkout />} />

//           {/* Admin Login Page */}
//           <Route path="/login" element={<AdminLogin />} /> {/* Login Route */}

//           {/* Admin Dashboard (Protected Route) */}
//           <Route path="/admin" element={<Admin />} />

//           <Route path="/bill" element={<Bill />} />

//           {/* Menu Page */}
//           <Route
//             path="/menu"
//             element={<Menu onAddToCart={handleAddToCart} />}
//           />
//         </Routes>

//         {/* Footer Component */}
//         <Footer />

//         {/* Floating Cart (always visible) */}
//         <Cart cartItems={cartItems} setCartItems={setCartItems} />
//       </div>
//     </Router>
//   );
// };

// export default App;






















import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Slider from "./Components/Slider";
import FoodGridWithCart from "./Components/FoodGrid";
import Footer from "./Components/Footer";
import Cart from "./Components/Cart";
import Pizza from "./Components/Pizza";
import Payment from "./Components/Payment";
import Admin from "./Components/Admin";
import Menu from "./Components/Menu";
import Checkout from "./Components/Track";
import Bill from "./Components/Bill";
import Banner from "./Components/Banner";
import Navbar from "./Components/Navbar";
import AdminLogin from "./Components/Login";
import FoodSlider from "./Components/FoodSlider";
import Order from "./Components/Order"; // Import the Order pa
import Policy from "./Components/Policy"

const AppContent = ({ cartItems, setCartItems, handleAddToCart }) => {
  const location = useLocation();
  const showNavbar = location.pathname === "/"; // Navbar only on the main page

  return (
    <div className="bg-gray-50 min-h-screen">
      {showNavbar && <Navbar cartItems={cartItems} />}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Slider />
              <FoodSlider addToCart={handleAddToCart} />
              <Banner />
              <FoodGridWithCart cartItems={cartItems} setCartItems={setCartItems} />
            </>
          }
        />
        <Route path="/food-slider" element={<FoodSlider addToCart={handleAddToCart} />} />
        <Route path="/pizza" element={<Pizza />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/bill" element={<Bill />} />
        <Route path="/menu" element={<Menu onAddToCart={handleAddToCart} />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/policy" element={<Policy />} />
      </Routes>
      <Footer />
      <Cart cartItems={cartItems} setCartItems={setCartItems} />
    </div>
  );
};

const App = () => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      const updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, qty: cartItem.qty + 1 }
          : cartItem
      );
      setCartItems(updatedCart);
    } else {
      const updatedCart = [...cartItems, { ...item, qty: 1 }];
      setCartItems(updatedCart);
    }
  };

  return (
    <Router>
      <AppContent
        cartItems={cartItems}
        setCartItems={setCartItems}
        handleAddToCart={handleAddToCart}
      />
    </Router>
  );
};

export default App;

