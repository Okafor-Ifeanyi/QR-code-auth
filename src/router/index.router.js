import express from 'express'
const router = express.Router()
import { validate } from '../middlewares/validate.middleware.js'
import { registerSchema } from '../schemas/index.schema.js'
import { register } from '../controllers/register.controller.js'
            
// CRUD Operations
router.post('/register', validate(registerSchema), register)

export default router