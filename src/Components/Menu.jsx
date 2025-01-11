// import React, { useEffect, useState } from "react";
// // import Swal from "sweetalert2";

// const MenuPage = () => {
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch menu data from Firebase
//   const fetchMenuData = async () => {
//     try {
//       const response = await fetch(
//         "https://menu2-2dbe2-default-rtdb.europe-west1.firebasedatabase.app/Menu.json"
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch data.");
//       }
//       const data = await response.json();
//       console.log(data);

//       if (!data) {
//         Swal.fire({
//           icon: "warning",
//           title: "No Data Found",
//           text: "No menu items available in the database.",
//         });
//         setLoading(false);
//         return;
//       }

//       // Convert object to array
//       const formattedData = Object.entries(data).map(([id, item]) => ({
//         id,
//         ...item,
//       }));

//       setMenuItems(formattedData);
//       setLoading(false);
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "Unable to load menu. Please try again later.",
//       });
//       console.error("Error fetching menu data:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMenuData();
//   }, []);

//   return (
//     <div style={{ backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
//       <header style={{ backgroundColor: "#4CAF50", padding: "1rem", color: "#fff" }}>
//         <h1 style={{ textAlign: "center", fontWeight: "bold" }}>Menu</h1>
//       </header>

//       <div style={{ padding: "2rem" }}>
//         {loading ? (
//           <div style={{ textAlign: "center", marginTop: "5rem" }}>
//             <div className="spinner"></div>
//             <p>Loading...</p>
//           </div>
//         ) : menuItems.length > 0 ? (
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
//               gap: "1.5rem",
//             }}
//           >
//             {menuItems.map((item) => (
//               <div
//                 key={item.id}
//                 style={{
//                   border: "1px solid #ddd",
//                   borderRadius: "10px",
//                   overflow: "hidden",
//                   backgroundColor: "#fff",
//                   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                   transition: "transform 0.3s",
//                 }}
//                 onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
//                 onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
//               >
//                 <img
//                   src={item.image || "https://via.placeholder.com/300"}
//                   alt={item.name}
//                   style={{ width: "100%", height: "200px", objectFit: "cover" }}
//                 />
//                 <div style={{ padding: "1rem" }}>
//                   <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0 0 0.5rem" }}>
//                     {item.name}
//                   </h2>
//                   <p style={{ color: "#555", margin: "0 0 0.5rem" }}>{item.description}</p>
//                   <p style={{ color: "#007BFF", margin: "0 0 0.5rem" }}>
//                     Category: {item.category}
//                   </p>
//                   <p style={{ fontWeight: "bold", color: "#000", margin: "0 0 0.5rem" }}>
//                     ₹{item.price}
//                   </p>
//                   <p style={{ color: "#ff9800", margin: 0 }}>⭐ {item.rating}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div style={{ textAlign: "center", marginTop: "5rem" }}>
//             <h2 style={{ color: "#555" }}>No menu items found</h2>
//           </div>
//         )}
//       </div>

//       <style>
//         {`
//           .spinner {
//             border: 4px solid #f3f3f3;
//             border-top: 4px solid #4CAF50;
//             border-radius: 50%;
//             width: 50px;
//             height: 50px;
//             animation: spin 1s linear infinite;
//             margin: 0 auto;
//           }
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default MenuPage;























































































































// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CardMedia,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Grid,
//   Snackbar,
//   TextField,
//   Typography,
//   MenuItem,
// } from "@mui/material";
// import { Alert } from "@mui/material";

// const App = () => {
//   const [foods, setFoods] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [formVisible, setFormVisible] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     rating: "",
//     image: "",
//     category: "All",
//   });
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

//   const categories = [
//     "All",
//     "Veg Pizza",
//     "Non-Veg Pizza",
//     "Burger",
//     "Noodles",
//     "Mocktail",
//     "Hot Coffee",
//     "Ice-Creams",
//     "Wrap",
//     "Sandwich",
//     "Veg Mains",
//     "Chicken Mains",
//     "Soup",
//     "Momos",
//     "Crunchy",
//     "Rice",
//   ];

//   const fetchFoods = async () => {
//     try {
//       const response = await fetch(
//         "https://login1-7a2e0-default-rtdb.firebaseio.com/Menu.json"
//       );
//       if (!response.ok) throw new Error("Failed to fetch data.");
//       const data = await response.json();
//       const formattedData = data
//         ? Object.entries(data).map(([id, food]) => ({ id, ...food }))
//         : [];
//       setFoods(formattedData);
//       setLoading(false);
//     } catch (error) {
//       setSnackbar({ open: true, message: "Failed to load food items.", severity: "error" });
//       setLoading(false);
//     }
//   };

//   const handleAddFood = async () => {
//     if (!form.name || !form.price || !form.description || !form.image || !form.category) {
//       setSnackbar({ open: true, message: "Please fill in all fields.", severity: "error" });
//       return;
//     }
//     const newFood = {
//       name: form.name,
//       description: form.description,
//       price: parseFloat(form.price),
//       rating: form.rating || "Not Rated",
//       image: form.image,
//       category: form.category,
//       isAvailable: true,
//     };
//     try {
//       const response = await fetch(
//         "https://login1-7a2e0-default-rtdb.firebaseio.com/Menu.json",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(newFood),
//         }
//       );
//       if (!response.ok) throw new Error("Failed to add food item.");
//       setSnackbar({ open: true, message: "Food item added successfully!", severity: "success" });
//       setForm({ name: "", description: "", price: "", rating: "", image: "", category: "All" });
//       setFormVisible(false);
//       fetchFoods();
//     } catch (error) {
//       setSnackbar({ open: true, message: "Failed to add food item.", severity: "error" });
//     }
//   };

//   const handleToggleAvailability = async (id, currentStatus) => {
//     try {
//       const response = await fetch(
//         `https://login1-7a2e0-default-rtdb.firebaseio.com/Menu/${id}.json`,
//         {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ isAvailable: !currentStatus }),
//         }
//       );
//       if (!response.ok) throw new Error("Failed to update availability.");
//       setSnackbar({
//         open: true,
//         message: `Food item marked as ${!currentStatus ? "available" : "unavailable"}!`,
//         severity: "success",
//       });
//       fetchFoods();
//     } catch (error) {
//       setSnackbar({ open: true, message: "Failed to update availability.", severity: "error" });
//     }
//   };

//   const handleDeleteFood = async (id) => {
//     try {
//       const response = await fetch(
//         `https://login1-7a2e0-default-rtdb.firebaseio.com/Menu/${id}.json`,
//         { method: "DELETE" }
//       );
//       if (!response.ok) throw new Error("Failed to delete food item.");
//       setSnackbar({ open: true, message: "Food item deleted!", severity: "success" });
//       fetchFoods();
//     } catch (error) {
//       setSnackbar({ open: true, message: "Failed to delete food item.", severity: "error" });
//     }
//   };

//   useEffect(() => {
//     fetchFoods();
//   }, []);

//   return (
//     <Box p={4}>
//       <Typography variant="h3" align="center" gutterBottom>
//         Admin - Food Menu
//       </Typography>

//       {/* Add Food Dialog */}
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => setFormVisible(true)}
//         sx={{ mb: 4 }}
//       >
//         Add New Food Item
//       </Button>

//       <Dialog open={formVisible} onClose={() => setFormVisible(false)}>
//         <DialogTitle>Add New Food Item</DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 label="Food Name"
//                 fullWidth
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Price"
//                 type="number"
//                 fullWidth
//                 value={form.price}
//                 onChange={(e) => setForm({ ...form, price: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Rating"
//                 fullWidth
//                 value={form.rating}
//                 onChange={(e) => setForm({ ...form, rating: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Description"
//                 fullWidth
//                 value={form.description}
//                 onChange={(e) => setForm({ ...form, description: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Image URL"
//                 fullWidth
//                 value={form.image}
//                 onChange={(e) => setForm({ ...form, image: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Category"
//                 fullWidth
//                 select
//                 value={form.category}
//                 onChange={(e) => setForm({ ...form, category: e.target.value })}
//               >
//                 {categories.map((category) => (
//                   <MenuItem key={category} value={category}>
//                     {category}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleAddFood} variant="contained" color="success">
//             Add
//           </Button>
//           <Button onClick={() => setFormVisible(false)} color="error">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Food Items Grid */}
//       {loading ? (
//         <Typography align="center">Loading...</Typography>
//       ) : (
//         <Grid container spacing={4}>
//           {foods.map((food) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={food.id}>
//               <Card>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={food.image}
//                   alt={food.name}
//                 />
//                 <CardContent>
//                   <Typography variant="h6">{food.name}</Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {food.description}
//                   </Typography>
//                   <Typography variant="subtitle1" color="textPrimary">
//                     ₹{food.price}
//                   </Typography>
//                   <Typography
//                     variant="caption"
//                     color={food.isAvailable ? "success.main" : "error.main"}
//                   >
//                     {food.isAvailable ? "Available" : "Unavailable"}
//                   </Typography>
//                   <Box mt={2}>
//                     <Button
//                       variant="outlined"
//                       color={food.isAvailable ? "error" : "success"}
//                       onClick={() =>
//                         handleToggleAvailability(food.id, food.isAvailable)
//                       }
//                       sx={{ mr: 1 }}
//                     >
//                       {food.isAvailable ? "Mark Unavailable" : "Mark Available"}
//                     </Button>
//                     <Button
//                       variant="contained"
//                       color="error"
//                       onClick={() => handleDeleteFood(food.id)}
//                     >
//                       Delete
//                     </Button>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       {/* Snackbar for Notifications */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//       >
//         <Alert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default App;

















































// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CardMedia,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Grid,
//   Snackbar,
//   TextField,
//   Typography,
//   MenuItem,
// } from "@mui/material";
// import { Alert } from "@mui/material";

// const App = () => {
//   const [foods, setFoods] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [formVisible, setFormVisible] = useState(false);
//   const [form, setForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     rating: "",
//     image: "",
//     category: "All",
//   });
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

//   const categories = [
//     "All",
//     "Veg Pizza",
//     "Non-Veg Pizza",
//     "Burger",
//     "Noodles",
//     "Mocktail",
//     "Hot Coffee",
//     "Ice-Creams",
//     "Wrap",
//     "Sandwich",
//     "Veg Mains",
//     "Chicken Mains",
//     "Soup",
//     "Momos",
//     "Crunchy",
//     "Rice",
//   ];

//   // Fetch Foods from Firebase
//   const fetchFoods = async () => {
//     try {
//       const response = await fetch(
//         "https://login1-7a2e0-default-rtdb.firebaseio.com/Menu.json"
//       );
//       if (!response.ok) throw new Error("Failed to fetch data.");
//       const data = await response.json();
//       console.log("Fetched Data:", data);

//       // If data exists, format it into an array
//       const formattedData = data
//         ? Object.entries(data).map(([id, food]) => ({
//             id,
//             ...food,
//           }))
//         : [];
//       console.log("Formatted Data:", formattedData);

//       setFoods(formattedData);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching foods:", error);
//       setSnackbar({ open: true, message: "Failed to load food items.", severity: "error" });
//       setLoading(false);
//     }
//   };

//   // Handle Add Food Item
//   const handleAddFood = async () => {
//     if (!form.name || !form.price || !form.description || !form.image || !form.category) {
//       setSnackbar({ open: true, message: "Please fill in all fields.", severity: "error" });
//       return;
//     }

//     const newFood = {
//       name: form.name,
//       description: form.description,
//       price: parseFloat(form.price),
//       rating: form.rating || "Not Rated",
//       image: form.image,
//       category: form.category,
//       isAvailable: true,
//     };

//     try {
//       const response = await fetch(
//         "https://login1-7a2e0-default-rtdb.firebaseio.com/Menu.json",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(newFood),
//         }
//       );
//       if (!response.ok) throw new Error("Failed to add food item.");
//       setSnackbar({ open: true, message: "Food item added successfully!", severity: "success" });
//       setForm({ name: "", description: "", price: "", rating: "", image: "", category: "All" });
//       setFormVisible(false);
//       fetchFoods();
//     } catch (error) {
//       setSnackbar({ open: true, message: "Failed to add food item.", severity: "error" });
//     }
//   };

//   // Handle Availability Toggle
//   const handleToggleAvailability = async (id, currentStatus) => {
//     try {
//       const response = await fetch(
//         `https://login1-7a2e0-default-rtdb.firebaseio.com/Menu/${id}.json`,
//         {
//           method: "PATCH",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ isAvailable: !currentStatus }),
//         }
//       );
//       if (!response.ok) throw new Error("Failed to update availability.");
//       setSnackbar({
//         open: true,
//         message: `Food item marked as ${!currentStatus ? "available" : "unavailable"}!`,
//         severity: "success",
//       });
//       fetchFoods();
//     } catch (error) {
//       setSnackbar({ open: true, message: "Failed to update availability.", severity: "error" });
//     }
//   };

//   // Handle Delete Food Item
//   const handleDeleteFood = async (id) => {
//     try {
//       const response = await fetch(
//         `https://login1-7a2e0-default-rtdb.firebaseio.com/Menu/${id}.json`,
//         { method: "DELETE" }
//       );
//       if (!response.ok) throw new Error("Failed to delete food item.");
//       setSnackbar({ open: true, message: "Food item deleted!", severity: "success" });
//       fetchFoods();
//     } catch (error) {
//       setSnackbar({ open: true, message: "Failed to delete food item.", severity: "error" });
//     }
//   };

//   useEffect(() => {
//     fetchFoods();
//   }, []);

//   return (
//     <Box p={4}>
//       <Typography variant="h3" align="center" gutterBottom>
//         Admin - Food Menu
//       </Typography>

//       {/* Add Food Dialog */}
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => setFormVisible(true)}
//         sx={{ mb: 4 }}
//       >
//         Add New Food Item
//       </Button>

//       <Dialog open={formVisible} onClose={() => setFormVisible(false)}>
//         <DialogTitle>Add New Food Item</DialogTitle>
//         <DialogContent>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 label="Food Name"
//                 fullWidth
//                 value={form.name}
//                 onChange={(e) => setForm({ ...form, name: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Price"
//                 type="number"
//                 fullWidth
//                 value={form.price}
//                 onChange={(e) => setForm({ ...form, price: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={6}>
//               <TextField
//                 label="Rating"
//                 fullWidth
//                 value={form.rating}
//                 onChange={(e) => setForm({ ...form, rating: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Description"
//                 fullWidth
//                 value={form.description}
//                 onChange={(e) => setForm({ ...form, description: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Image URL"
//                 fullWidth
//                 value={form.image}
//                 onChange={(e) => setForm({ ...form, image: e.target.value })}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 label="Category"
//                 fullWidth
//                 select
//                 value={form.category}
//                 onChange={(e) => setForm({ ...form, category: e.target.value })}
//               >
//                 {categories.map((category) => (
//                   <MenuItem key={category} value={category}>
//                     {category}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleAddFood} variant="contained" color="success">
//             Add
//           </Button>
//           <Button onClick={() => setFormVisible(false)} color="error">
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Food Items Grid */}
//       {loading ? (
//         <Typography align="center">Loading...</Typography>
//       ) : (
//         <Grid container spacing={4}>
//           {foods.map((food) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={food.id}>
//               <Card>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={food.image}
//                   alt={food.name}
//                 />
//                 <CardContent>
//                   <Typography variant="h6">{food.name}</Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {food.description}
//                   </Typography>
//                   <Typography variant="subtitle1" color="textPrimary">
//                     ₹{food.price}
//                   </Typography>
//                   <Typography
//                     variant="caption"
//                     color={food.isAvailable ? "success.main" : "error.main"}
//                   >
//                     {food.isAvailable ? "Available" : "Unavailable"}
//                   </Typography>
//                   <Box mt={2}>
//                     <Button
//                       variant="outlined"
//                       color={food.isAvailable ? "error" : "success"}
//                       onClick={() =>
//                         handleToggleAvailability(food.id, food.isAvailable)
//                       }
//                       sx={{ mr: 1 }}
//                     >
//                       {food.isAvailable ? "Mark Unavailable" : "Mark Available"}
//                     </Button>
//                     <Button
//                       variant="contained"
//                       color="error"
//                       onClick={() => handleDeleteFood(food.id)}
//                     >
//                       Delete
//                     </Button>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}

//       {/* Snackbar for Notifications */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//       >
//         <Alert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// };

// export default App;















































































import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Snackbar,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { Alert } from "@mui/material";

const App = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    rating: "",
    image: "",
    category: "All",
    isBestSeller: false,
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const categories = [
    "All",
    "Veg Pizza",
    "Non-Veg Pizza",
    "Burger",
    "Noodles",
    "Mocktail",
    "Hot Coffee",
    "Ice-Creams",
    "Wrap",
    "Sandwich",
    "Veg Mains",
    "Chicken Mains",
    "Soup",
    "Momos",
    "Crunchy",
    "Rice",
  ];

  // Fetch Foods from Firebase
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

      setFoods(formattedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching foods:", error);
      setSnackbar({ open: true, message: "Failed to load food items.", severity: "error" });
      setLoading(false);
    }
  };

  // Handle Add Food Item
  const handleAddFood = async () => {
    if (!form.name || !form.price || !form.description || !form.image || !form.category) {
      setSnackbar({ open: true, message: "Please fill in all fields.", severity: "error" });
      return;
    }

    const newFood = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      rating: form.rating || "Not Rated",
      image: form.image,
      category: form.category,
      isAvailable: true,
      isBestSeller: form.isBestSeller,
    };

    try {
      const response = await fetch(
        "https://login1-7a2e0-default-rtdb.firebaseio.com/Menu.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newFood),
        }
      );
      if (!response.ok) throw new Error("Failed to add food item.");
      setSnackbar({ open: true, message: "Food item added successfully!", severity: "success" });
      setForm({ name: "", description: "", price: "", rating: "", image: "", category: "All", isBestSeller: false });
      setFormVisible(false);
      fetchFoods();
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to add food item.", severity: "error" });
    }
  };

  // Handle Availability Toggle
  const handleToggleAvailability = async (id, currentStatus) => {
    try {
      const response = await fetch(
        `https://login1-7a2e0-default-rtdb.firebaseio.com/Menu/${id}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isAvailable: !currentStatus }),
        }
      );
      if (!response.ok) throw new Error("Failed to update availability.");
      setSnackbar({
        open: true,
        message: `Food item marked as ${!currentStatus ? "available" : "unavailable"}!`,
        severity: "success",
      });
      fetchFoods();
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to update availability.", severity: "error" });
    }
  };

  // Handle Delete Food Item
  const handleDeleteFood = async (id) => {
    try {
      const response = await fetch(
        `https://login1-7a2e0-default-rtdb.firebaseio.com/Menu/${id}.json`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete food item.");
      setSnackbar({ open: true, message: "Food item deleted!", severity: "success" });
      fetchFoods();
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to delete food item.", severity: "error" });
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h3" align="center" gutterBottom>
        Admin - Food Menu
      </Typography>

      {/* Add Food Dialog */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => setFormVisible(true)}
        sx={{ mb: 4 }}
      >
        Add New Food Item
      </Button>

      <Dialog open={formVisible} onClose={() => setFormVisible(false)}>
        <DialogTitle>Add New Food Item</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Food Name"
                fullWidth
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Price"
                type="number"
                fullWidth
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Rating"
                fullWidth
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image URL"
                fullWidth
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Category"
                fullWidth
                select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color={form.isBestSeller ? "success" : "default"}
                fullWidth
                onClick={() => setForm({ ...form, isBestSeller: !form.isBestSeller })}
              >
                {form.isBestSeller ? "Marked as Best Seller" : "Mark as Best Seller"}
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddFood} variant="contained" color="success">
            Add
          </Button>
          <Button onClick={() => setFormVisible(false)} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* Food Items Grid */}
      {loading ? (
        <Typography align="center">Loading...</Typography>
      ) : (
        <>
          <Typography variant="h4" gutterBottom>
            Best Sellers
          </Typography>
          <Grid container spacing={4} sx={{ mb: 4 }}>
            {foods
              .filter((food) => food.isBestSeller)
              .map((food) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={food.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={food.image}
                      alt={food.name}
                    />
                    <CardContent>
                      <Typography variant="h6">{food.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {food.description}
                      </Typography>
                      <Typography variant="subtitle1" color="textPrimary">
                        ₹{food.price}
                      </Typography>
                      <Typography
                        variant="caption"
                        color={food.isAvailable ? "success.main" : "error.main"}
                      >
                        {food.isAvailable ? "Available" : "Unavailable"}
                      </Typography>
                    </CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() =>
                          handleToggleAvailability(food.id, food.isAvailable)
                        }
                      >
                        {food.isAvailable ? "Mark Unavailable" : "Mark Available"}
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteFood(food.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
          </Grid>

          <Typography variant="h4" gutterBottom>
            All Foods
          </Typography>
          <Grid container spacing={4}>
            {foods
              .filter((food) => !food.isBestSeller)
              .map((food) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={food.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={food.image}
                      alt={food.name}
                    />
                    <CardContent>
                      <Typography variant="h6">{food.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {food.description}
                      </Typography>
                      <Typography variant="subtitle1" color="textPrimary">
                        ₹{food.price}
                      </Typography>
                      <Typography
                        variant="caption"
                        color={food.isAvailable ? "success.main" : "error.main"}
                      >
                        {food.isAvailable ? "Available" : "Unavailable"}
                      </Typography>
                    </CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() =>
                          handleToggleAvailability(food.id, food.isAvailable)
                        }
                      >
                        {food.isAvailable ? "Mark Unavailable" : "Mark Available"}
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleDeleteFood(food.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ open: false, message: "", severity: "success" })}
      >
        <Alert onClose={() => setSnackbar({ open: false, message: "", severity: "success" })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default App;
