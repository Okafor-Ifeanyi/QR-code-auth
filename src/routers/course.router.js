import express from 'express'
const router = express.Router()
import { validate } from '../middlewares/validate.middleware.js'
import { loginSchema, registerSchema, updateSchema } from '../schemas/index.schema.js'
import { isAdmin, isAuth } from '../middlewares/authentication.middleware.js'
import { createCourse } from '../controllers/course.controller.js'

// register course for admin
router.post("/create", isAuth, isAdmin, createCourse)


// route to make payment
// route to mark attendance
// route to check result
// route to make payment

export default router