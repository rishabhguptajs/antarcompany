import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"
import { comparePasswords, hashPassword } from "../helpers/authHelper.js"

export const userRegisterController = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please enter all fields",
        success: false,
      })
    }

    const user = await userModel.findOne({
      email,
    })

    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      })
    }

    const hashedPassword = await hashPassword(password)

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    })

    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        success: true,
      })
    } else {
      res.status(400).json({
        message: "Invalid user data",
        success: false,
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "Error while registering user",
      error: error.message,
      success: false,
    })
  }
}

export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter all fields",
        success: false,
      })
    }

    const user = await userModel.findOne({
      email,
    })

    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        success: false,
      })
    }

    if (user) {
      const isMatch = await comparePasswords(password, user.password)
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      )

        if (isMatch) {
            res.status(200).json({
            _id: user._id,
            user: {
                name: user.name,
                email: user.email,
                token: token,
                success: true,
            },
            })
        } else {
            res.status(400).json({
            message: "Invalid password",
            success: false,
            })
        }
    } else {
      res.status(400).json({
        message: "Invalid email or password",
        success: false,
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "Error while logging in user",
      error: error.message,
      success: false,
    })
  }
}

export const userGetProfileController = async (req, res) => {
  try {
    const user = await userModel.findOne(req.user._id).select("-password");

    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        success: true,
      })
    } else {
      res.status(404).json({
        message: "User not found",
        success: false,
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "Error while getting user profile",
      error: error.message,
      success: false,
    })
  }
}

export const userProfileUpdateController = async (req, res) => {
  try {
    const user = await userModel.findOne(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      if (req.body.password) {
        user.password = await hashPassword(req.body.password);
      }

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        success: true,
      })
    } else {
      res.status(404).json({
        message: "User not found",
        success: false,
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "Error while updating user profile",
      error: error.message,
      success: false,
    })
  }
}