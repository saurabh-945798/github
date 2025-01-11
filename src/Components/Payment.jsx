import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, totalPrice } = location.state || {};

  const [formData, setFormData] = useState({
    tableNumber: "",
    specialInstructions: "",
    vehicleNumber: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [showExtraCharges, setShowExtraCharges] = useState(false);
  const [orderType, setOrderType] = useState("dine"); // Default to "dine"

  const gst = totalPrice ? totalPrice * 0.05 : 0;
  const convenienceFee = totalPrice ? totalPrice * 0.05 : 0;
  const gstOnConvenienceFee = convenienceFee * 0.18;
  const totalExtraCharges = gst + convenienceFee + gstOnConvenienceFee;
  const finalPayableAmount = totalPrice + totalExtraCharges;

  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => setRazorpayLoaded(true);
      script.onerror = () => console.error("Failed to load Razorpay SDK");
      document.body.appendChild(script);
    };
    loadRazorpayScript();
  }, []);

  const handleBackNavigation = (event) => {
    event.preventDefault();
    if (orderPlaced) {
      navigate("/");
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You have unsaved changes. Going back will discard your order!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#38b000",
        cancelButtonColor: "#e63946",
        confirmButtonText: "Yes, Go Back!",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/");
        }
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePayment = async () => {
    const missingField =
      orderType === "dine" && !formData.tableNumber
        ? "Table number"
        : orderType === "take" && !formData.vehicleNumber
        ? "Vehicle number"
        : null;

    if (missingField) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: `Please fill in the ${missingField}.`,
      });
      return;
    }

    if (!razorpayLoaded) {
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: "Payment service is not ready. Please try again later.",
      });
      return;
    }

    const options = {
      key: "rzp_test_2wLyy6wPo2UCAY",
      amount: Math.round(finalPayableAmount * 100),
      currency: "INR",
      name: "Your Business Name",
      description: "Order Payment",
      image: "https://yourbusinesslogo.com/logo.png",
      handler: async (response) => {
        console.log("Payment successful:", response);
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: "Thank you for your order.",
          confirmButtonText: "Ok",
        });

        const orderData = {
          ...formData,
          orderType,
          status: "Paid",
          cartItems,
          totalPrice: finalPayableAmount,
          gst,
          convenienceFee,
          gstOnConvenienceFee,
          timestamp: new Date().toISOString(),
        };

        try {
          const saveResponse = await fetch(
            "https://check-18079-default-rtdb.firebaseio.com/ff.json",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(orderData),
            }
          );

          if (saveResponse.ok) {
            setOrderPlaced(true);

            const emailData = {
              orderType,
              tableNumber: formData.tableNumber,
              vehicleNumber: formData.vehicleNumber,
              specialInstructions: formData.specialInstructions,
              cartItems: cartItems
                .map((item) => `${item.name} - ₹${item.price} x ${item.qty}`)
                .join(", "),
              totalAmount: finalPayableAmount.toFixed(2),
            };

            emailjs
              .send(
                "service_48qpquj",
                "template_agxpbka",
                emailData,
                "Q9yA1C4PTHSCKXkVT"
              )
              .then(
                (result) => {
                  console.log("Email sent successfully", result.text);
                },
                (error) => {
                  console.error("Error sending email", error.text);
                }
              );
          } else {
            throw new Error("Failed to save order.");
          }
        } catch (error) {
          console.error("Error saving order:", error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-gradient-to-r from-purple-400 to-blue-500 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={(event) => handleBackNavigation(event)}
              className="bg-white text-purple-600 rounded-full p-2 mr-4 hover:bg-gray-100"
            >
              <FaArrowLeft />
            </button>
            <h1 className="text-2xl font-bold">Checkout</h1>
          </div>
          <div>
            <span className="text-sm">Total Payable:</span>{" "}
            <span className="font-bold text-lg">
              ₹{finalPayableAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6">
        {!orderPlaced ? (
          cartItems && cartItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-gray-100 p-4 rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-grow ml-4">
                        <h3 className="text-sm font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          ₹{item.price} x {item.qty}
                        </p>
                      </div>
                      <p className="font-bold text-gray-800">
                        ₹{item.price * item.qty}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block font-semibold mb-2">
                      Order Type:
                    </label>
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setOrderType("dine")}
                        className={`w-1/2 p-4 rounded-md border-2 transition-colors duration-200 text-center font-semibold ${
                          orderType === "dine"
                            ? "bg-purple-500 text-white border-purple-600"
                            : "bg-gray-100 border-gray-300"
                        }`}
                      >
                        Dine In
                      </button>
                      <button
                        onClick={() => setOrderType("take")}
                        className={`w-1/2 p-4 rounded-md border-2 transition-colors duration-200 text-center font-semibold ${
                          orderType === "take"
                            ? "bg-purple-500 text-white border-purple-600"
                            : "bg-gray-100 border-gray-300"
                        }`}
                      >
                        Take Away
                      </button>
                    </div>
                  </div>
                  {orderType === "dine" && (
                    <input
                      type="text"
                      name="tableNumber"
                      placeholder="Table Number"
                      value={formData.tableNumber}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  )}
                  {orderType === "take" && (
                    <input
                      type="text"
                      name="vehicleNumber"
                      placeholder="Vehicle Number"
                      value={formData.vehicleNumber}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md"
                    />
                  )}
                  <textarea
                    name="specialInstructions"
                    placeholder="Special Instructions"
                    value={formData.specialInstructions}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md"
                  />

                  <div className="text-gray-700">
                    <p>Subtotal: ₹{totalPrice}</p>
                    <p
                      className="flex items-center cursor-pointer"
                      onClick={() => setShowExtraCharges(!showExtraCharges)}
                    >
                      Extra Charges{" "}
                      {showExtraCharges ? <FaEyeSlash /> : <FaEye />}
                    </p>
                    {showExtraCharges && (
                      <div>
                        <p>GST (5%): ₹{gst.toFixed(2)}</p>
                        <p>Convenience Fee (5%): ₹{convenienceFee.toFixed(2)}</p>
                        <p>
                          GST on Convenience Fee (18%): ₹
                          {gstOnConvenienceFee.toFixed(2)}
                        </p>
                      </div>
                    )}
                    <hr className="my-2" />
                    <p className="font-bold">
                      Total Payable: ₹{finalPayableAmount.toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={handlePayment}
                    className="w-full mt-4 py-2 bg-purple-500 text-white rounded-lg hover:opacity-90"
                  >
                    Pay ₹{finalPayableAmount.toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p>No items in cart</p>
          )
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-green-600">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-600 mt-4">
              You Will Get Your Order On Your Table. Thanks!
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Payment;











// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";

// const Payment = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { cartItems, totalPrice } = location.state || {};

//   const [formData, setFormData] = useState({
//     tableNumber: "",
//     name: "",
//     contact: "",
//     specialInstructions: "",
//     status: "",
//   });

//   const [orderPlaced, setOrderPlaced] = useState(false);

//   // Calculating Charges
//   const gst = totalPrice ? totalPrice * 0.05 : 0; // 5% GST
//   const convenienceFee = totalPrice ? totalPrice * 0.06 : 0; // 6% Convenience Fee
//   const totalExtraCharges = gst + convenienceFee;
//   const finalPayableAmount = totalPrice + totalExtraCharges;

//   const handleBackNavigation = (event) => {
//     event.preventDefault();
//     toast.warning("You have unsaved changes. Going back will discard your order!", {
//       position: "top-center",
//       autoClose: 5000,
//       onClose: () => navigate(-1),
//     });
//   };

//   useEffect(() => {
//     const handlePopState = (event) => {
//       event.preventDefault();
//       handleBackNavigation(event);
//     };

//     window.addEventListener("popstate", handlePopState);
//     return () => {
//       window.removeEventListener("popstate", handlePopState);
//     };
//   }, [navigate]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handlePayment = async () => {
//     if (!formData.tableNumber || !formData.name || !formData.contact) {
//       toast.error("Please fill in all required fields.", {
//         position: "top-center",
//       });
//       return;
//     }

//     const orderData = {
//       ...formData,
//       status: "Pending", // Add the initial status
//       cartItems,
//       totalPrice: finalPayableAmount,
//       gst,
//       convenienceFee,
//       timestamp: new Date().toISOString(),
//     };

//     try {
//       const response = await fetch(
//         "https://check-18079-default-rtdb.firebaseio.com/ff.json",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(orderData),
//         }
//       );

//       if (response.ok) {
//         toast.success("Your order has been placed successfully!", {
//           position: "top-center",
//         });
//         setOrderPlaced(true);
//       } else {
//         throw new Error("Failed to save data.");
//       }
//     } catch (error) {
//       toast.error("There was an issue saving your order. Please try again.", {
//         position: "top-center",
//       });
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <ToastContainer />
//       <header className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 shadow-md">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Checkout</h1>
//           <button
//             onClick={(event) => handleBackNavigation(event)}
//             className="text-sm bg-white text-green-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100"
//           >
//             Go Back
//           </button>
//         </div>
//       </header>

//       <main className="container mx-auto p-6">
//         {!orderPlaced ? (
//           cartItems && cartItems.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {/* Order Summary */}
//               <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
//                 <div className="space-y-4">
//                   {cartItems.map((item) => (
//                     <div
//                       key={item.id}
//                       className="flex items-center justify-between bg-gray-100 p-4 rounded-lg"
//                     >
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-16 h-16 object-cover rounded-md"
//                       />
//                       <div className="flex-grow ml-4">
//                         <h3 className="text-sm font-semibold">{item.name}</h3>
//                         <p className="text-sm text-gray-600">
//                           ₹{item.price} x {item.qty}
//                         </p>
//                       </div>
//                       <p className="font-bold text-gray-800">
//                         ₹{item.price * item.qty}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Payment Details */}
//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
//                 <div className="space-y-4">
//                   <input
//                     type="text"
//                     name="tableNumber"
//                     placeholder="Table Number"
//                     value={formData.tableNumber}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded-md"
//                   />
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="Your Name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded-md"
//                   />
//                   <input
//                     type="text"
//                     name="contact"
//                     placeholder="Contact Number"
//                     value={formData.contact}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded-md"
//                   />
//                   <textarea
//                     name="specialInstructions"
//                     placeholder="Special Instructions"
//                     value={formData.specialInstructions}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded-md"
//                   />

//                   {/* Extra Charges */}
//                   <div className="text-gray-700">
//                     <p>Subtotal: ₹{totalPrice}</p>
//                     <p>GST (5%): ₹{gst.toFixed(2)}</p>
//                     <p>Convenience Fee (6%): ₹{convenienceFee.toFixed(2)}</p>
//                     <hr className="my-2" />
//                     <p className="font-bold">Total Payable: ₹{finalPayableAmount.toFixed(2)}</p>
//                   </div>

//                   {/* Pay Button */}
//                   <button
//                     onClick={handlePayment}
//                     className="w-full mt-4 py-2 bg-green-500 text-white rounded-lg hover:opacity-90"
//                   >
//                     Pay ₹{finalPayableAmount.toFixed(2)}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <p>No items in cart</p>
//           )
//         ) : (
//           <div className="bg-white p-6 rounded-lg shadow-md text-center">
//             <h2 className="text-2xl font-bold text-green-600">
//               Order Placed Successfully!
//             </h2>
//             <p className="text-gray-600 mt-4">
//               You Will Get Your Order On Your Table Thanks!!
//             </p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Payment;








































































































































































































// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import emailjs from "emailjs-com";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const Payment = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { cartItems, totalPrice } = location.state || {};

//   // Retrieve query parameters
//   const queryParams = new URLSearchParams(location.search);
//   const presetTableNumber = queryParams.get("tableNumber");

//   const [formData, setFormData] = useState({
//     tableNumber: presetTableNumber || "", // Use the preset table number if available
//     name: "",
//     contact: "",
//     specialInstructions: "",
//     status: "",
//   });

//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [razorpayLoaded, setRazorpayLoaded] = useState(false);
//   const [showExtraCharges, setShowExtraCharges] = useState(false);

//   // Calculating Charges
//   const gst = totalPrice ? totalPrice * 0.05 : 0; // 5% GST
//   const convenienceFee = totalPrice ? totalPrice * 0.05 : 0; // 5% Convenience Fee
//   const totalExtraCharges = gst + convenienceFee;
//   const finalPayableAmount = totalPrice + totalExtraCharges;

//   // Load Razorpay script dynamically
//   useEffect(() => {
//     const loadRazorpayScript = () => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.async = true;
//       script.onload = () => setRazorpayLoaded(true);
//       script.onerror = () => console.error("Failed to load Razorpay SDK");
//       document.body.appendChild(script);
//     };

//     loadRazorpayScript();
//   }, []);

//   const handleBackNavigation = (event) => {
//     event.preventDefault();
//     if (orderPlaced) {
//       navigate("/");
//     } else {
//       Swal.fire({
//         title: "Are you sure?",
//         text: "You have unsaved changes. Going back will discard your order!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonColor: "#38b000",
//         cancelButtonColor: "#e63946",
//         confirmButtonText: "Yes, Go Back!",
//         cancelButtonText: "Cancel",
//       }).then((result) => {
//         if (result.isConfirmed) {
//           navigate("/");
//         }
//       });
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handlePayment = async () => {
//     if (!formData.tableNumber || !formData.name || !formData.contact) {
//       Swal.fire({
//         icon: "error",
//         title: "Missing Information",
//         text: "Please fill in all required fields.",
//       });
//       return;
//     }

//     if (!razorpayLoaded) {
//       Swal.fire({
//         icon: "error",
//         title: "Payment Error",
//         text: "Payment service is not ready. Please try again later.",
//       });
//       return;
//     }

//     const options = {
//       key: "rzp_test_2wLyy6wPo2UCAY", // Replace with your Razorpay API Key
//       amount: Math.round(finalPayableAmount * 100),
//       currency: "INR",
//       name: "Your Business Name",
//       description: "Table Order Payment",
//       image: "https://yourbusinesslogo.com/logo.png",
//       handler: async (response) => {
//         console.log("Payment successful:", response);
//         Swal.fire({
//           icon: "success",
//           title: "Payment Successful!",
//           text: "Thank you for your order.",
//           confirmButtonText: "Ok",
//         });

//         const orderData = {
//           ...formData,
//           status: "Paid",
//           cartItems,
//           totalPrice: finalPayableAmount,
//           gst,
//           convenienceFee,
//           timestamp: new Date().toISOString(),
//         };

//         try {
//           const saveResponse = await fetch(
//             "https://check-18079-default-rtdb.firebaseio.com/ff.json",
//             {
//               method: "POST",
//               headers: {
//                 "Content-Type": "application/json",
//               },
//               body: JSON.stringify(orderData),
//             }
//           );

//           if (saveResponse.ok) {
//             setOrderPlaced(true);

//             const emailData = {
//               tableNumber: formData.tableNumber,
//               name: formData.name,
//               contact: formData.contact,
//               specialInstructions: formData.specialInstructions,
//               cartItems: cartItems
//                 .map((item) => `${item.name} - ₹${item.price} x ${item.qty}`)
//                 .join(", "),
//               totalAmount: finalPayableAmount.toFixed(2),
//             };

//             emailjs
//               .send(
//                 "service_48qpquj",
//                 "template_agxpbka",
//                 emailData,
//                 "Q9yA1C4PTHSCKXkVT"
//               )
//               .then(
//                 (result) => {
//                   console.log("Email sent successfully", result.text);
//                 },
//                 (error) => {
//                   console.error("Error sending email", error.text);
//                 }
//               );
//           } else {
//             throw new Error("Failed to save order.");
//           }
//         } catch (error) {
//           console.error("Error saving order:", error);
//         }
//       },
//       prefill: {
//         name: formData.name,
//         email: "customer@example.com",
//         contact: formData.contact,
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };

//     const razorpay = new window.Razorpay(options);
//     razorpay.open();
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen">
//       <header className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-6 shadow-md">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Checkout</h1>
//           <button
//             onClick={(event) => handleBackNavigation(event)}
//             className="text-sm bg-white text-green-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100"
//           >
//             Go Back
//           </button>
//         </div>
//       </header>

//       <main className="container mx-auto p-6">
//         {!orderPlaced ? (
//           cartItems && cartItems.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
//                 <div className="space-y-4">
//                   {cartItems.map((item) => (
//                     <div
//                       key={item.id}
//                       className="flex items-center justify-between bg-gray-100 p-4 rounded-lg"
//                     >
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-16 h-16 object-cover rounded-md"
//                       />
//                       <div className="flex-grow ml-4">
//                         <h3 className="text-sm font-semibold">{item.name}</h3>
//                         <p className="text-sm text-gray-600">
//                           ₹{item.price} x {item.qty}
//                         </p>
//                       </div>
//                       <p className="font-bold text-gray-800">
//                         ₹{item.price * item.qty}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="bg-white p-6 rounded-lg shadow-md">
//                 <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
//                 <div className="space-y-4">
//                   <input
//                     type="text"
//                     name="tableNumber"
//                     placeholder="Table Number"
//                     value={formData.tableNumber}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded-md"
//                   />
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="Your Name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded-md"
//                   />
//                   <input
//                     type="text"
//                     name="contact"
//                     placeholder="Contact Number"
//                     value={formData.contact}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded-md"
//                   />
//                   <textarea
//                     name="specialInstructions"
//                     placeholder="Special Instructions"
//                     value={formData.specialInstructions}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded-md"
//                   />

//                   <div className="text-gray-700">
//                     <p>Subtotal: ₹{totalPrice}</p>
//                     <p
//                       className="flex items-center cursor-pointer"
//                       onClick={() => setShowExtraCharges(!showExtraCharges)}
//                     >
//                       Extra Charges{" "}
//                       {showExtraCharges ? <FaEyeSlash /> : <FaEye />}
//                     </p>
//                     {showExtraCharges && (
//                       <div>
//                         <p>GST (5%): ₹{gst.toFixed(2)}</p>
//                         <p>Convenience Fee (5%): ₹{convenienceFee.toFixed(2)}</p>
//                       </div>
//                     )}
//                     <hr className="my-2" />
//                     <p className="font-bold">
//                       Total Payable: ₹{finalPayableAmount.toFixed(2)}
//                     </p>
//                   </div>

//                   <button
//                     onClick={handlePayment}
//                     className="w-full mt-4 py-2 bg-green-500 text-white rounded-lg hover:opacity-90"
//                   >
//                     Pay ₹{finalPayableAmount.toFixed(2)}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <p>No items in cart</p>
//           )
//         ) : (
//           <div className="bg-white p-6 rounded-lg shadow-md text-center">
//             <h2 className="text-2xl font-bold text-green-600">
//               Order Placed Successfully!
//             </h2>
//             <p className="text-gray-600 mt-4">
//               You Will Get Your Order On Your Table. Thanks!
//             </p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default Payment;
