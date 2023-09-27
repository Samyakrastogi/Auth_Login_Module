const express = require("express");
const authService = require("./auth.service");
const userService = require("./user.service");
const router = express.Router();

// Base path: http://localhost:4000/users

router.post("/forgot", userService.forgotPassword); //Forgot
router.get("/reset", userService.resetPassword); //Reset

//Authorised API's
router.post("/", authService.validateToken, userService.createUser); //Create

router.get("/", authService.validateToken, userService.getUsers); //Get

router.get("/:id", authService.validateToken, userService.getUserById); //Get By ID

router.put("/:id", authService.validateToken, userService.updateUser); //Update

router.delete("/:id", authService.validateToken, userService.deleteUser); //Delete

module.exports = router;
