import express from 'express'
const router = express.Router()
import { validate } from '../middlewares/validate.middleware.js'
import { loginSchema, registerSchema } from '../schemas/index.schema.js'
import { login, register, getUserByID, getRoleByID, updateUserRole } from '../controllers/user.controller.js'
import { isAdmin, isAuth } from '../middlewares/authentication.middleware.js'
            
router.get("/docs", (req, res) => 
  res.redirect("https://documenter.getpostman.com/view/19026826/2s93m7X2Jc") );

// CRUD Operations
router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)

// route to get a user
router.get('/:id', getUserByID)

// route to get all Students
router.get('/all/:role', isAuth, getRoleByID)

// route to change role
router.patch('/:id', isAuth, isAdmin, updateUserRole)

// route to make payment
// route to mark attendance
// route to check result
// route to make payment

export default router