const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");





const login=async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ msg: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
}
     



const signup=async (req, res) => {

  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
}



module.exports={login,signup}