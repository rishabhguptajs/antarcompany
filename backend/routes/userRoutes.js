import express from "express"
import {
  userGetProfileController,
  userLoginController,
  userProfileUpdateController,
  userRegisterController,
} from "../controllers/userController.js"

const router = express.Router()

router.post("/register", userRegisterController)
router.post("/login", userLoginController)
router.get("/profile", userGetProfileController)
router.put("/profile/update", userProfileUpdateController)

export default router