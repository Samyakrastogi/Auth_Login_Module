const express = require("express");
const router = express.Router();
const authService = require('./auth.service')

// Base path: http://localhost:4000/

//Create
router.post(
  '/register',
  authService.register
);

router.post(
  '/login',
  authService.login
);

router.get("/posts", authService.validateToken, (req, res)=>{
  console.log("Token is valid")
  console.log(req.user.user)
  res.send(`${req.user.user} successfully accessed post`)
  })

module.exports = router;