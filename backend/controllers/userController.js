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
