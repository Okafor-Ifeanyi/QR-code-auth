import express from 'express'
const router = express.Router()
import userRoute from "./user.router.js"
import courseRoute from "./course.router.js"
import { validate } from '../middlewares/validate.middleware.js'
import { loginSchema, registerSchema } from '../schemas/index.schema.js'
import { isAdmin, isAuth } from '../middlewares/authentication.middleware.js'
            
router.get("/docs", (req, res) => 
  res.redirect("https://documenter.getpostman.com/view/19026826/2s93m7X2Jc") );

router.use("/users", userRoute);
router.use("/courses", courseRoute);

export default router