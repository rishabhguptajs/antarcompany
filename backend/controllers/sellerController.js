import { comparePasswords, hashPassword } from "../helpers/authHelper.js"
import sellerModel from "../models/sellerModel.js"
import JWT from "jsonwebtoken"

export const sellerRegisterController = async (req, res) => {
  const { name, email, password, address } = req.body

  try {
    const sellerExists = await sellerModel.findOne({
      email,
    })

    if (sellerExists) {
      res.status(400)
      throw new Error("Seller already exists")
    }

    const hashedPassword = await hashPassword(password)

    const seller = await sellerModel.create({
      name,
      email,
      password: hashedPassword,
      address,
    })

    if (seller) {
      res.status(201).json({
        _id: seller._id,
        name: seller.name,
        email: seller.email,
        address: seller.address,
        success: true,
      })
    } else {
      res.status(400)
      throw new Error("Invalid seller data")
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    })
  }
}

export const sellerLoginController = async (req, res) => {
  const { email, password } = req.body

  try {
    const seller = await sellerModel.findOne({
      email,
    })

    if (seller) {
      const isMatch = await comparePasswords(password, seller.password)
      const token = JWT.sign(
        { email: seller.email, id: seller._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      )

      if (isMatch) {
        res.status(200).json({
          _id: seller._id,
          seller: {
            name: seller.name,
            email: seller.email,
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
      res.status(404).json({
        message: "Seller not found",
        success: false,
      })
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    })
  }
}
