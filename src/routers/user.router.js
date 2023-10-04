import express from 'express'
const router = express.Router()
import { validate } from '../middlewares/validate.middleware.js'
import { loginSchema, registerSchema, updateSchema } from '../schemas/index.schema.js'
import { login, register, getUserByID, updateUserRole, getUsersByRole, generateQR } from '../controllers/user.controller.js'
import { isAdmin, isAuth } from '../middlewares/authentication.middleware.js'

// CRUD Operations
router.post('/register', validate(registerSchema), register)
router.post('/login', validate(loginSchema), login)

// generate QR Code
router.get('/generateQRCode', isAuth, generateQR)

// route to get all User by Role
router.get('/all/:role', isAuth, getUsersByRole)

// route to change role
router.patch('/:id', validate(updateSchema), isAuth, isAdmin, updateUserRole)

// route to get a user
router.get('/:id', getUserByID)

// route to make payment
// route to mark attendance
// route to check result
// route to make payment

export default router