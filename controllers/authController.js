const User = require("../models/User");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "all  fields required!",
      });
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "user is  already exist!",
      });
    }

    const user = await User.create({
      username: username,
      email: email,
      password: password,
    });

    res.status(201).json({
      success: true,
      message: "user  register succefully!",
      token: generateToken(user._id),
      data: {
        id: user._id,
        username: username,
        email: email,
        password: password,
      },
    });
  } catch (error) {
    console.error(error);

    return res
      .status(500)
      .json({ success: false, message: "Internal server  error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    res.status(200).json({
      success: true,
      token: generateToken(user._id),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    // req.user is attached by the authMiddleware
    const user = await User.findById(req.user._id).select("-password");
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      token: generateToken(updatedUser._id),
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "Username or Email already exists" });
    }
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Please provide both old and new passwords" });
    }

    const user = await User.findById(req.user._id);

    const isMatch = await user.matchPassword(oldPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect current password" });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "No user found with this email address" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetPasswordOTP = otp;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT), 
      secure: false, 
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //  Set Email Details
    const mailOptions = {
      from: '"Security Team" <no-reply@authapp.com>',
      to: user.email,
      subject: "Your Password Reset OTP Code",
      text: `Your password reset code is: ${otp}. It will expire in 10 minutes. If you did not request this, please ignore this email.`,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ success: true, message: "OTP code sent to your email" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//    Verify OTP & Reset Password
//    POST /api/auth/reset-password
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    if (!email || !otp || !newPassword) {
      return res
        .status(400)
        .json({ message: "Please provide email, OTP, and new password" });
    }

    const user = await User.findOne({
      email,
      resetPasswordOTP: otp,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid OTP or code has expired" });
    }

    user.password = newPassword;

    user.resetPasswordOTP = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful. You can now log in.",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
