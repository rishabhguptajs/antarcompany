import { comparePasswords, hashPassword } from "../helpers/authHelper.js"
import sellerModel from "../models/sellerModel.js"
import productModel from "../models/productModel.js"
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
      message: "Error registering seller",
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
      message: "Error logging in seller",
      success: false,
    })
  }
}

export const sellerProfileController = async(req, res) => {
  try {
    const seller = await sellerModel.findOne(req.seller._id).select("-password")

    if (seller) {
      res.status(200).json({
        _id: seller._id,
        name: seller.name,
        email: seller.email,
        address: seller.address,
        success: true,
      })
    } else {
      res.status(404).json({
        message: "Seller not found",
        success: false,
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "Error fetching seller profile",
      error: error.message,
      success: false,
    })
  }
}

export const sellerProfileUpdateController = async(req, res) => {
  try {
    const seller = await sellerModel.findOne(req.seller._id);
    const { name, password, address } = req.body;

    if(seller){
      seller.name = name || seller.name;
      seller.address = address || seller.address;

      if(password){
        seller.password = await hashPassword(password);
      }

      const updatedSeller = await seller.save();

      res.status(200).json({
        _id: updatedSeller._id,
        name: updatedSeller.name,
        email: updatedSeller.email,
        address: updatedSeller.address,
        success: true,
      })
    } else {
      res.status(404).json({
        message: "Seller not found",
        success: false,
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "Error updating seller profile",
      error: error.message,
      success: false,
    })
  }
}

export const sellerBankUpdateController = async(req, res) => {
  try {
    const seller = await sellerModel.findOne(req.seller._id);
    const { bankName, bankAccountNumber, bankBranch, bankIFSC, bankAccountHolder } = req.body;

    if(seller){
      seller.bankName = bankName || seller.bankName;
      seller.bankAccountNumber = bankAccountNumber || seller.bankAccountNumber;
      seller.bankBranch = bankBranch || seller.bankBranch;
      seller.bankIFSC = bankIFSC || seller.bankIFSC;
      seller.bankAccountHolder = bankAccountHolder || seller.bankAccountHolder;
      seller.verificationStatus = true;

      const updatedSeller = await seller.save();

      res.status(200).json({
        _id: updatedSeller._id,
        name: updatedSeller.name,
        email: updatedSeller.email,
        address: updatedSeller.address,
        bankName: updatedSeller.bankName,
        bankAccountNumber: updatedSeller.bankAccountNumber,
        bankBranch: updatedSeller.bankBranch,
        bankIFSC: updatedSeller.bankIFSC,
        bankAccountHolder: updatedSeller.bankAccountHolder,
        success: true,
      })
    } else {
      res.status(404).json({
        message: "Seller not found",
        success: false,
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "Error updating seller bank details",
      error: error.message,
      success: false,
    })
  }
}

export const sellerProductAddController = async(req, res) => {
  try {
    const { name, price, image, category, countInStock, description } = req.body;

    const product = await productModel.create({
      name,
      price,
      image,
      category,
      countInStock,
      description,
      seller: req.seller.id
    })

    if(product){
      res.status(201).json({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        countInStock: product.countInStock,
        description: product.description,
        seller: product.seller,
        success: true,
      })
    } else {
      res.status(400).json({
        message: "Invalid product data",
        success: false,
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "Error adding product",
      success: false,
      error: error.message
    })
  }
}

