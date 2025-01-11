// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2"; // Import SweetAlert2

// const Menu = () => {
//   const navigate = useNavigate();

//   const menuItems = [
//     { name: "Pizza", image: "https://img.freepik.com/free-psd/top-view-delicious-pizza_23-2151868924.jpg?t=st=1734193788~exp=1734197388~hmac=5d776f898898744cf1b2ebd5e2f52a9ebedbe9d19c6cafadda9300c339ed9242&w=740", path: "/pizza " },
//     { name: "Burger", image: "https://img.freepik.com/free-psd/fresh-beef-burger-isolated-transparent-background_191095-9018.jpg?t=st=1734193862~exp=1734197462~hmac=8fef8a45bbaf02f071c3b7cb9c111efe1a0f19032d629f6eecc8f47fc258e487&w=740", path: "/" },
//     { name: "Pasta", image: "https://img.freepik.com/free-psd/spaghetti-with-meatballs-tomato-sauce-bowl-closeup-shot-isolated-transparent-background_84443-1458.jpg?t=st=1734194133~exp=1734197733~hmac=3b0372d0b375544e98a3435918bf0489d83a0373d06c0cf4c2aaade1bb2ed853&w=740", path: "/" },
//     { name: "Chicken", image: "https://img.freepik.com/free-psd/roasted-chicken-plate-wood-white-background_84443-1402.jpg?t=st=1734194265~exp=1734197865~hmac=0af06d19f3d096a075ba3656bb1fa4f1b9eb31ccfc2f192cf514540bf0d90eb2&w=740", path: "/" },
//     { name: "Cake", image: "https://img.freepik.com/free-psd/kuchen-isolated-transparent-background_191095-40179.jpg?t=st=1734194215~exp=1734197815~hmac=2505134087ebad99b8019852635a98dc4857be1bfd83b3c2f34e644ebb9024cc&w=740", path: "/" },
//     { name: "Coffee", image: "https://img.freepik.com/free-psd/delicious-coffee-cup-isolated_23-2151806499.jpg?t=st=1734194200~exp=1734197800~hmac=2b40fafefdef37f7d1a191ec4650ea26144303d665f5a12cabe28293488e61ec&w=996", path: "/" },
//   ];

//   const marqueeStyle = {
//     display: "flex",
//     gap: "1.5rem",
//     animation: "marquee 15s linear infinite",
//     whiteSpace: "nowrap",
//   };

//   const keyframesStyle = `
//     @keyframes marquee {
//       0% { transform: translateX(0%); }
//       100% { transform: translateX(-100%); }
//     }
//   `;

//   // Function to show "Coming Soon" alert
//   const handleItemClick = (item) => {
//     Swal.fire({
//       title: `${item.name}`,
//       text: "Coming Soon!",
//       icon: "info",
//       confirmButtonText: "OK",
//     });
//   };

//   return (
//     <div className="p-8">
//       <style>{keyframesStyle}</style>
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-semibold mb-2 italic">Best Of Cold Rock.</h1>
//         <p className="text-gray-600 max-w-xl mx-auto">
//           Choose from a diverse menu featuring a delectable array of dishes. Our
//           mission is to satisfy your cravings and elevate your dining experience, one
//           delicious meal at a time.
//         </p>
//       </div>

//       {/* Marquee Effect Section */}
//       <div className="overflow-hidden relative">
//         <div style={marqueeStyle}>
//           {menuItems.concat(menuItems).map((item, index) => (
//             <div
//               key={index}
//               className="flex flex-col items-center min-w-[120px] mx-2"
//               onClick={() => handleItemClick(item)} // Show alert on click
//               style={{ cursor: "pointer" }} // Change cursor to pointer
//             >
//               <div className="w-28 h-28 rounded-full overflow-hidden shadow-md border">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-full object-cover"
//                 />
//               </div>
//               <p className="mt-2 text-gray-700 font-medium">{item.name}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Menu;






// import React from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const foodItems = [
//   {
//     id: 1,
//     name: "Onion Pizza",
//     price: 150,
//     rating: 4.5,
//     tag: "Pizza",
//     description: "A delicious pizza topped with fresh onions for a delightful flavor.",
//     img: "https://content.jdmagicbox.com/comp/def_content/pizza_outlets/default-pizza-outlets-13.jpg",
//   },
//   {
//     id: 2,
//     name: "Sushi Platter",
//     price: 650,
//     rating: 4.8,
//     tag: "Sushi",
//     description: "A fresh and authentic sushi platter.",
//     img: "https://images.unsplash.com/photo-1553621042-f6e147245754",
//   },
//   {
//     id: 3,
//     name: "Pasta Carbonara",
//     price: 300,
//     rating: 4.2,
//     tag: "Pasta",
//     description: "Creamy and cheesy pasta carbonara.",
//     img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
//   },
//   {
//     id: 4,
//     name: "Caesar Salad",
//     price: 180,
//     rating: 4.1,
//     tag: "Salad",
//     description: "A fresh and healthy Caesar salad.",
//     img: "https://images.unsplash.com/photo-1582515073490-399813c962d2",
//   },
// ];

// function FoodCarousel({ cartItems, setCartItems }) {
//   const settings = {
//     dots: true,
//     infinite: true,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   const handleAddToCart = (item) => {
//     const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
//     if (existingItem) {
//       const updatedCart = cartItems.map((cartItem) =>
//         cartItem.id === item.id
//           ? { ...cartItem, qty: cartItem.qty + 1 }
//           : cartItem
//       );
//       setCartItems(updatedCart);
//     } else {
//       setCartItems([...cartItems, { ...item, qty: 1 }]);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Heading */}
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//         🌟 Colrock Specials: Treat Your Taste Buds! 🌟
//       </h1>

//       {/* Carousel */}
//       <Slider {...settings}>
//         {foodItems.map((item) => (
//           <div key={item.id} className="px-2">
//             <div className="bg-white shadow-lg rounded-xl overflow-hidden relative">
//               {/* Tag */}
//               <span className="absolute top-2 left-2 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded">
//                 {item.tag}
//               </span>
//               {/* Rating */}
//               <span className="absolute top-2 right-2 bg-yellow-400 text-white text-sm font-bold px-2 py-1 rounded">
//                 ⭐ {item.rating}
//               </span>
//               {/* Image */}
//               <img
//                 src={item.img}
//                 alt={item.name}
//                 className="w-full h-40 object-cover rounded-t-xl"
//               />
//               {/* Content */}
//               <div className="p-4">
//                 <h2 className="text-xl font-bold">{item.name}</h2>
//                 <p className="text-gray-600 text-sm mb-2">{item.description}</p>
//                 <div className="flex items-center justify-between">
//                   <p className="text-green-500 font-bold text-lg">₹{item.price}</p>
//                   <button
//                     onClick={() => handleAddToCart(item)}
//                     className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                   >
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// }

// export default FoodCarousel;








































// import React, { useState } from "react";

// const foodItems = [
//   {
//     id: 1,
//     name: "Onion Pizza",
//     price: 150,
//     description: "A delicious pizza topped with fresh onions.",
//     image: "https://content.jdmagicbox.com/comp/def_content/pizza_outlets/default-pizza-outlets-13.jpg",
//   },
//   {
//     id: 2,
//     name: "Sushi Platter",
//     price: 650,
//     description: "A fresh and authentic sushi platter.",
//     image: "https://images.unsplash.com/photo-1553621042-f6e147245754",
//   },
// ];

// const FoodSlider = ({ addToCart }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % foodItems.length);
//   };

//   const prevSlide = () => {
//     setCurrentIndex(
//       (prevIndex) => (prevIndex - 1 + foodItems.length) % foodItems.length
//     );
//   };

//   const handleAddToCart = () => {
//     const selectedItem = foodItems[currentIndex];
//     // console.log("Adding to cart:", selectedItem); // Debugging
//     addToCart(selectedItem); // Pass the full item object, including `image`
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//         🌟 Food Specials: Treat Your Taste Buds! 🌟
//       </h1>
//       <div className="relative">
//         <button
//           onClick={prevSlide}
//           className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full"
//         >
//           {"<"}
//         </button>

//         <div className="w-full flex justify-center">
//           <div className="bg-white shadow-lg rounded-xl overflow-hidden max-w-md">
//             <img
//               src={foodItems[currentIndex].image}
//               alt={foodItems[currentIndex].name}
//               className="w-full h-40 object-cover rounded-t-xl"
//             />
//             <div className="p-4">
//               <h2 className="text-xl font-bold">{foodItems[currentIndex].name}</h2>
//               <p className="text-gray-600 text-sm mb-2">
//                 {foodItems[currentIndex].description}
//               </p>
//               <div className="flex items-center justify-between">
//                 <p className="text-green-500 font-bold text-lg">
//                   ₹{foodItems[currentIndex].price}
//                 </p>
//                 <button
//                   onClick={handleAddToCart}
//                   className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         <button
//           onClick={nextSlide}
//           className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full"
//         >
//           {">"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FoodSlider;








// import React from "react";
// import Slider from "react-slick";
// import Swal from "sweetalert2";
// import "./FoodSlider.css"; // Import the CSS for animations

// // Food items data
// const foodItems = [
//   {
//     id: 1,
//     name: "Veggie Delight Pizza",
//     price: 150,
//     description: "Tomato, Onion & Capsicum",
//     image:
//       "https://images.mrcook.app/recipe-image/0191d5f0-1a26-70d9-8441-2861ea8f4129",
//   },
//   {
//     id: 2,
//     name: "Deluxe Chicken Pizza",
//     price: 170,
//     description: "Tomato, Onion, Capsicum, Black Olive, Corn & Chicken",
//     image:
//       "https://img.freepik.com/free-photo/top-view-chicken-pizza-with-yellow-cherry-tomatoes-bell-pepper-board_141793-3971.jpg",
//   },
//   {
//     id: 3,
//     name: "Spicy Paneer Burger",
//     price: 170,
//     description: "A spicy burger filled with paneer and hot spices.",
//     image: "https://i.ytimg.com/vi/kUdIhifyJYg/maxresdefault.jpg",
//   },
//   {
//     id: 4,
//     name: "Premium Paneer Burger",
//     price: 160,
//     description: "A premium burger with a delicious paneer patty.",
//     image:
//       "https://img.freepik.com/premium-photo/spicy-paneer-tikka-burger-white-background-paneer-tikka-image-photography_1020697-118615.jpg",
//   },
//   {
//     id: 5,
//     name: "Mango Shooter",
//     price: 120,
//     description: "Delightful mango shooter for a tropical vibe.",
//     image:
//       "https://www.mango.org/wp-content/uploads/2020/11/ShrimpShooters.jpeg",
//   },
//   {
//     id: 6,
//     name: "Virgin Mint Mojito",
//     price: 160,
//     description: "A refreshing mint mojito without alcohol.",
//     image:
//       "https://sodastream.sg/cdn/shop/articles/Virgin_Mojito_Mocktail_Recipe_720x.jpg?v=1694760601",
//   },
// ];

// const FoodSlider = ({ addToCart }) => {
//   const handleAddToCart = (foodItem) => {
//     addToCart(foodItem);
//     Swal.fire({
//       icon: "success",
//       title: "Added to Cart!",
//       text: `${foodItem.name} has been added to your cart.`,
//     });
//   };

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: false,
//   };

//   return (
//     <div className="px-4 py-10 max-w-5xl mx-auto">
//       <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
//         🌟ColdRock Special🌟
//       </h1>

//       <Slider {...settings}>
//         {foodItems.map((item) => (
//           <div
//             key={item.id}
//             className="p-4 bg-white shadow-lg rounded-xl hover:shadow-2xl transition-shadow transform hover:scale-105 slide"
//           >
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-full rounded-t-xl h-64 object-cover"
//             />
//             <div className="p-5">
//               <h2 className="text-2xl font-semibold text-gray-800 mb-2">
//                 {item.name}
//               </h2>
//               <p className="text-gray-600 mb-4">{item.description}</p>
//               <div className="flex items-center justify-between">
//                 <span className="text-xl font-bold text-green-600">
//                   ₹{item.price}
//                 </span>
//                 <button
//                   onClick={() => handleAddToCart(item)}
//                   className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-all"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default FoodSlider;













































import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./FoodSlider.css";

const FoodSlider = ({ addToCart }) => {
  const [bestSellers, setBestSellers] = useState([]);

  // Fetch food data from Firebase
  const fetchFoods = async () => {
    try {
      const response = await fetch(
        "https://login1-7a2e0-default-rtdb.firebaseio.com/Menu.json"
      );
      if (!response.ok) throw new Error("Failed to fetch data.");
      const data = await response.json();

      // Format data into an array
      const formattedData = data
        ? Object.entries(data).map(([id, food]) => ({
            id,
            ...food,
          }))
        : [];

      // Filter out only the best-sellers
      const bestSellerItems = formattedData.filter((item) => item.isBestSeller);

      setBestSellers(bestSellerItems);
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchFoods();
  }, []);

  const handleAddToCart = (foodItem) => {
    addToCart(foodItem);

    // Display the custom toast notification
    toast.success(
      <div className="flex items-center">
        <img
          src={foodItem.image}
          alt={foodItem.name}
          className="w-16 h-16 rounded-md object-cover mr-3"
        />
        <div>
          <strong>{foodItem.name}</strong> has been added to your cart!
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        {/* <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-12">
          🌟 ColdRock 🌟
        </h1> */}

        {bestSellers.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 italic text-center">
            🌟 Best Sellers 🌟
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {bestSellers.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-white shadow-xl rounded-2xl hover:shadow-2xl transition-transform transform hover:scale-105"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full rounded-t-2xl h-64 object-cover mb-4"
                  />
                  <div className="p-5">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                      {item.name}
                    </h2>
                    <p className="text-gray-600 mb-4">{item.description}</p>

                    {/* Display Category */}
                    <div className="inline-block px-3 py-1 my-2 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                      {item.category}
                    </div>

                    {/* Display Rating */}
                    <div className="flex items-center text-yellow-500 my-2">
                      {"★".repeat(Math.round(item.rating || 0)) +
                        "☆".repeat(5 - Math.round(item.rating || 0))}
                      <span className="ml-2 text-gray-600 text-sm">
                        {item.rating || "No Ratings"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-green-700">
                        ₹{item.price}
                      </span>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="bg-gradient-to-r from-green-400 to-green-600 text-white py-2 px-6 rounded-lg hover:from-green-500 hover:to-green-700 transition-all"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ToastContainer to display the toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default FoodSlider;










