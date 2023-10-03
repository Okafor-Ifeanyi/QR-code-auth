import { userModel } from "../model/user.model.js";
// const { storeImage } = require('../utils/cloudinary.util');
import { storeImage } from "../configs/cloudinary.config.js";
import { encode_jwt } from "../configs/jwt.config.js";

// Register Patient
const register = async (req, res) => {
    const info = req.body;
  
    try {
      // CrossCheck if the email or phone number is existing in the database
      const existingUsername = await userModel.findOne({ username: info.username });
  
      // Throw error if email or phone number is already existing
      if (existingUsername) {
        return res.status(400).json({ message: "User data already exists" });
      }
  
      // profile Picture
      if (req.files !== undefined) {
        if (req.files.profile_img !== undefined) {
          var profile_img = await storeImage(req.files.profile_img.path)
        } 
      }

      // Create Patient
      const userData = await userModel.create({...info, profile_img });
  
      // Response
      res.status(200).json({ Success: true, message: userData });
  
    } catch (error) {
      res.status(500).json({ Success: false, message: error.message }) 
    }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ username });
    if (!existingUser)
      return res.status(404).json({ message: "User does not exist" });

    const checkPassword = await existingUser.matchPassword(password);
    if (!checkPassword)
      return res.status(400).json({ message: "Incorrect Password" });

    const token = encode_jwt({ _id: existingUser._id });

    res.status(200).json({
      token: token,
      Token_Type: "Bearer",
      userId: existingUser._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export{ register, login }