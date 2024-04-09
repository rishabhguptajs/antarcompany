import jwt from "jsonwebtoken"

export const verifySeller = async (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    )
    req.seller = decoded
    next()
  } catch (error) {
    res.status(400).json({
      message: "Authorization failed",
      error: error.message,
      success: false,
    })
  }
}

export const verifyAdmin = async (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    )
    req.user = decoded
    next()
  } catch (error) {
    res.status(400).json({
      message: "Authorization failed",
      error: error.message,
      success: false,
    })
  }
}
