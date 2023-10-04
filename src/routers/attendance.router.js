import express from 'express'
const router = express.Router()
import { isAdmin, isAuth } from '../middlewares/authentication.middleware.js'
import { markInAttendance, markOutAttendance } from '../controllers/attendance.controller.js'
import { validate } from '../middlewares/validate.middleware.js'
import { attendanceSchema } from '../schemas/index.schema.js'

// register course for admin
router.post("/signIn", validate(attendanceSchema), isAuth, markInAttendance)
router.post("/signOut", validate(attendanceSchema), isAuth, markOutAttendance)


export default router