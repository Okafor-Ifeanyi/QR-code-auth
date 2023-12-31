import joi from 'joi'

// Joi Validation schema used to verify req data
const registerSchema = joi.object().keys({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email(),
  password: joi.string().min(6).required(),
  role: joi.string().valid('student'),
  confirm_password: joi
    .any()
    .equal(joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "Confirm Password does not match the password" }),
  contactNumber: joi.string().max(11),
  username: joi.string().required()
});

const loginSchema = joi.object().keys({
  password: joi.string().min(6).required(),
  username: joi.string().required()
});

const updateSchema = joi.object().keys({
  role: joi.string().valid("teacher", "student", "admin"),
});

const attendanceSchema = joi.object().keys({
  qrCodeData: joi.string().length(32).required()
});

export { registerSchema, loginSchema, updateSchema, attendanceSchema }
