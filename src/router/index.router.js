import express from 'express'
const router = express.Router()
import { validate } from '../middlewares/validate.middleware.js'
import { loginSchema, registerSchema } from '../schemas/index.schema.js'
import { login, register } from '../controllers/user.controller.js'
            
router.get("/docs", (req, res) => 
  res.redirect("https://documenter.getpostman.com/view/19026826/2s93m7X2Jc") );


// CRUD Operations
router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)

export default router