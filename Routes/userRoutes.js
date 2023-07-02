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

// Update a user by ID
router.put("/users/:id", UserController.updateUserById);

// Delete a user by ID
router.delete("/users/:id", UserController.deleteUserById);

//-----------------------------Account-------------------------

// Login user
router.post("/login", UserController.loginUser);

// Update user information (member)
router.put("/users/:id", UserController.updateUserInformation);


module.exports = router;
