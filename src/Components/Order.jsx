import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const KitchenDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "https://check-18079-default-rtdb.firebaseio.com/ff.json"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }
      const data = await response.json();

      // Get today's date to compare with order timestamp
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Set to the start of today (midnight)
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1); // Set to the start of tomorrow (midnight)

      // Filter orders to show only today's orders
      const filteredOrders = Object.entries(data)
        .map(([id, order]) => ({
          id,
          ...order,
        }))
        .filter((order) => {
          const orderDate = new Date(order.timestamp);
          return orderDate >= today && orderDate < tomorrow;
        })
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setOrders(filteredOrders);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to load orders. Please try again later.");
    }
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // Fetch every 5 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const handlePrint = (orderId) => {
    const orderToPrint = document.getElementById(orderId);
    const printWindow = window.open("", "_blank", "width=600,height=600");
    printWindow.document.write("<html><head><title>Order Bill</title></head><body>");
    printWindow.document.write(orderToPrint.innerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} />
      <header className="bg-purple-600 text-white py-4 px-6 shadow-lg">
        <h1 className="text-2xl font-bold">Kitchen Dashboard</h1>
      </header>

      <div className="flex-grow p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Today's Orders
        </h2>

        {loading ? (
          <div className="text-center">
            <p className="text-lg text-gray-600">Loading...</p>
          </div>
        ) : orders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-y-auto max-h-[75vh]">
            {orders.map((order) => (
              <div
                key={order.id}
                id={order.id} // Add ID for the print function
                className={`p-4 rounded-lg shadow-lg transition-all ${
                  new Date() - new Date(order.timestamp) < 60000
                    ? "bg-blue-50"
                    : "bg-white"
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-bold text-gray-800">
                    {/* Conditional rendering based on vehicle number */}
                    {order.vehicleNumber ? "Take Away" : `Table #${order.tableNumber}`}
                  </h3>
                  <div
                    className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {order.status}
                  </div>
                </div>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Order Number:</span> {order.id}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Total Price:</span> ₹
                  {order.totalPrice}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Special Instructions:</span>{" "}
                  {order.specialInstructions || "N/A"}
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-semibold">Vehicle Number:</span> {order.vehicleNumber || "N/A"}
                </p>
                <div className="text-gray-700">
                  <span className="font-semibold">Items:</span>
                  <ul className="list-disc pl-5 mt-1 text-sm">
                    {order.cartItems.map((item, index) => (
                      <li key={index}>
                        {item.name} x {item.qty}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  <span className="font-semibold">Ordered At:</span>{" "}
                  {new Date(order.timestamp).toLocaleDateString()}{" "}
                  {new Date(order.timestamp).toLocaleTimeString()}
                </p>
                <button
                  onClick={() => handlePrint(order.id)}
                  className="mt-4 text-sm text-blue-600 hover:underline"
                >
                  Print Bill
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            No orders available for today.
          </div>
        )}
      </div>
    </div>
  );
};

export default KitchenDashboard;
