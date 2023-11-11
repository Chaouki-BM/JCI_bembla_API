const express = require("express");
const router = express.Router();
const UserController = require("../Controllers/UserController")

// Create a new user
router.post("/users", UserController.createUser);

// Create a new users
//multi user for testing process "mockData"
router.post("/multiusers", UserController.createUsers);

// Get all users
router.get("/users", UserController.getAllUsers);

// Get a single user by ID
router.get("/users/:id", UserController.getUserById);

// Update a user by ID all info 
router.put("/users/:id", UserController.updateUserById);

// Delete a user by ID
router.delete("/users/:id", UserController.deleteUserById);

//-----------------------------Account-------------------------

// Login user
router.post("/login", UserController.loginUser);




router.put("/update/:userId", UserController.updateUserInformation);
// Update user information FullName, DateOfBirth, cin , role only
// {
//   "FullName": "John Doe",
//   "DateOfBirth": "1990-01-01",
//   "cin": "12345678",
//   "role" : "new role"   
// }


//----------------- update pass
router.put("/passwordUpdate", UserController.updatePassword);


// reset password ------------------------------------------------- 
router.put("/resetPassword", UserController.resetPasswordByEmail);

module.exports = router;
