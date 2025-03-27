const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Sneaker = require("../models/Sneaker");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// User login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    if (user.blocked){
      return res.status(400).json({ msg: "Your account has been blocked" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const token = jwt.sign({ userid: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({ msg: "Login successful", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

// User signup
const signup = async (req, res) => {
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
};



const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });


    // Generate token
    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry in log
    await user.save();

    // Nodemailer transporter initialisation
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "ajuajmal20354@gmail.com",
        pass: "gyir nrba znsb dgpr"
      }
    });

    // Send email with reset link to the user 


    const resetLink = `http://localhost:5173/resetpassword/${token}`;
    const mailOptions = {
      from: process.env.GMAIL,
      to: user.email,
      subject: "Password Reset Request",
      html: `
             <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; text-align: center; padding: 20px; border: 2px solid black">
             <p style="font-size: 18px;">Hello ${user.email},</p>
             <p>We received a request to reset your password.</p>
             <p>Please click the button below to reset your password:</p>
             <a href="${resetLink}" style="
                 display: inline-block; 
                 padding: 12px 20px; 
                 font-size: 16px; 
                 font-weight: bold;
                 color: #fff; 
                 background-color: #007bff; 
                 text-decoration: none; 
                 border-radius: 15px;
                 margin-top: 10px;
             ">
                 Reset Password
             </a>
             <p style="margin-top: 20px;">If you did not request this, please ignore this email.</p>
             <p>Best regards,<br>Share a meal Team</p>
             </div>

             `,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });



    res.json({ msg: "Reset link sent to your email" });









  } catch (error) {
    console.log(error);


  }
}




const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    console.log(newPassword);
    

    const user = await User.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() }, // Check expiry
    });

    if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

    // Hash new password
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ msg: "Password updated successfully" });

} catch (error) {
    console.log(error)
    res.status(500).json({ msg: "Server error" });

    }

}




// Get user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userid).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Edit user profile
const editProfile = async (req, res) => {
  try {
    const { username, email, phone, location, pincode } = req.body;
    const user = await User.findById(req.user.userid); // ✅ FIXED

    if (!user) return res.status(404).json({ msg: "User not found" });

    user.username = username || user.username;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.location = location || user.location;
    user.pincode = pincode || user.pincode;

    await user.save();
    res.json({ msg: "Profile updated successfully!", user });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;
    const query = search ? { username: { $regex: search, $options: "i" } } : {};

    const users = await User.find(query)
      .select("-password")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const totalUsers = await User.countDocuments(query);

    res.status(200).json({
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: Number(page),
    });

  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

// Delete user (Admin only)
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};


const getallproduct = async (req, res) => {
  try {
    const products = await Sneaker.find().select("-password");
    res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ msg: "Server error", error });
    }
  }

  const toggleBlockUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
  
      if (!user) return res.status(404).json({ msg: "User not found" });
  
      user.blocked = !user.blocked;
      await user.save();
  
      res.json({ msg: `User ${user.blocked ? "blocked" : "unblocked"} successfully`, user });
    } catch (error) {
      console.error("Error blocking user:", error);
      res.status(500).json({ msg: "Server error" });
    }
  };


module.exports = { login, signup, getProfile, editProfile, getAllUsers, deleteUser, forgotPassword ,resetPassword,getallproduct,toggleBlockUser};
