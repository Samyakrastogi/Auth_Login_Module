const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const authUsers = require("./auth.model.js");

const register = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new authUsers({
      username: req.body.username,
      password: hashedPassword,
    });
    const createdUser = await newUser.save();
    res.status(201).json({ message: "User Created", createdUser });
  } catch (error) {
    res.status(500).json({ message: "Error Found", error });
  }
};

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await authUsers.findOne({ username });

    if (!user) {
      return res.status(404).send("User does not exist!");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const accessToken = generateAccessToken({ user: username });
      const refreshToken = generateRefreshToken({ user: username });
      res.json({
        username,
        password: user.password,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      res.status(401).send("Password Incorrect!");
    }
  } catch (error) {
    res.status(500).json({ message: "Error Found", error });
  }
};

function generateAccessToken(user) {
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  return accessToken;
}

let refreshTokens = [];
function generateRefreshToken(user) {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "20m",
  });
  refreshTokens.push(refreshToken);
  return refreshToken;
}

function validateToken(req, res, next) {
    //get token from request header
    const authHeader = req.headers["authorization"]
    const token = authHeader.split(" ")[1]
    //the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
    if (token == null) res.sendStatus(400).send("Token not present")
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) { 
     res.status(403).send("Token invalid")
     }
     else {
     req.user = user
     next() //proceed to the next action in the calling function
     }
    }) //end of jwt.verify()
    } 

module.exports = {
  register,
  login,
  validateToken
};
