const User = require("../models/user");
const bcrypt = require("bcrypt");

// The register function takes the user data from the request body and checks if the username and email already exist in the database. If the username or email already exists, it returns an error message. If the username and email do not exist, it hashes the password using bcrypt and saves the user data to the database. It then returns a success message along with the user data.

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const isUsernameExist = await User.findOne({ username });
    if (isUsernameExist) {
      return res.status(400).json({ message: "Username already exist" });
    }
    const isEmailExist = await User.findOne({ email });
    if (isEmailExist) {
      return res.status(400).json({ message: "Email already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// The login function takes the user data from the request body and checks if the username exists in the database. If the username does not exist, it returns an error message. If the username exists, it compares the password with the hashed password in the database using bcrypt. If the password is correct, it returns a success message along with the user data. If the password is incorrect, it returns an error message.

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username,
    });
    if (!user) {
      return res.status(400).json({
        message: "Username does not exist",
      });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }
    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};
