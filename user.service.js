const User = require("./user.model");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const bcrypt = require("bcrypt");
const authUsers = require("./auth.model");

const createUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      age: req.body.age,
      contactNo: req.body.contactNo,
      place: req.body.place,
    });
    console.log("new user :", newUser);
    const createdUser = await newUser.save();
    res.json({ message: "User created successfully", createdUser });
  } catch (err) {
    res
      .status(400)
      .json({ errorMessage: "Bad Request, Unable to Create User", err });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json({ message: "User Found", users }).status(200);
  } catch (err) {
    res
      .status(400)
      .json({ errorMessage: "Bad Request, Unable to Get Users", err });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json({ message: "User Found", user }).status(200);
    } else {
      res.json({ mesage: "Invalid ID, User Not Found" });
    }
  } catch (err) {
    res
      .status(400)
      .json({ errorMessage: "Bad Request, Unable to Get User By ID", err });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully", user });
  } catch (err) {
    res
      .status(400)
      .json({ errorMessage: "Bad Request, Unable to Delete User", err });
  }
};

const updateUser = async (req, res) => {
  try {
    const userData = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!userData) {
      res.json({ error: "User Not Found" });
    }
    res.json({ message: "User Updated Successfully", userData });
  } catch (err) {
    res
      .status(400)
      .json({ errorMessage: "Bad Request, Unable to Update User", err });
  }
};

const sendResetPasswordMail = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "rajrastogi1110@gmail.com",
        pass: "izac ywha bsze cblr",
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password",
      html:
        "<p> Hii " +
        name +
        ', Please copy the link and <a href="http://localhost:4000/users/reset?token=' +
        token +
        '"> reset you password </a> </p>',
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("Error Occured :", error);
      } else {
        console.log("Mail has been successfully sent :", info.response);
      }
    });
  } catch (error) {
    res.status(200).send({ message: "Error Occured", error });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const userData = await User.findOne({ name, email });
    console.log("User data -->", userData);
    if (userData) {
      const randomString = randomstring.generate();
      const timestamp = Date.now().toString();
      const token = randomString + timestamp;
      const data = await User.updateOne(
        { name: name },
        { $set: { token: token } }
      );
      sendResetPasswordMail(userData.name, userData.email, randomString);
      res
        .status(200)
        .send({ message: "Please Check you mail and reset password" });
    } else {
      res.status(200).send({ message: "This Email Does not Exist" });
    }
  } catch (error) {
    res.status(400).json({ errorMessage: "Bad Request,", error });
  }
};

const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    res.status(400).json({ errorMessage: "Bad Request,", error });
    // throw error;
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = req.query.token;
    const tokenData = await User.findOne({ token: token, email: email });
    console.log("token data -->", tokenData);
    if (tokenData) {
      const password = req.body.password;
      const newPassword = await securePassword(password);
      console.log("hashed new pass -->", newPassword);
      const userData = await User.findByIdAndUpdate(
        { _id: tokenData._id },
        { $set: { password: newPassword, token: "" } },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "User Password Reset Successful", userData });
    } else {
      res.status(200).json({ message: "Link Expired" });
    }
  } catch (error) {
    res.status(400).json({ errorMessage: "Bad Request,", error });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  forgotPassword,
  sendResetPasswordMail,
  resetPassword,
};
