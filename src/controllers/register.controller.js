import { userModel } from "../model/user.model.js";
// const { storeImage } = require('../utils/cloudinary.util');
import { storeImage } from "../configs/cloudinary.config.js";

// Register Patient
const register = async (req, res) => {
    const info = req.body;
  
    try {
      // CrossCheck if the email or phone number is existing in the database
      const existingEmail = await userModel.findOne({
        email: info.email,
      });
      const existingUsername = await patientService.findOne({
        username: info.username,
      });
  
      // Throw error if email or phone number is already existing
      if (existingEmail || existingUsername) {
        return res.status(400).json({ message: "User data already exists" });
      }
  
      // profile Picture
      if (req.files !== undefined) {
        if (req.files.profile_img !== undefined) {
          var profile_img = await storeImage(req.files.profile_img.path)
        } 
      }
  
      // Create Patient
      const userData = await patientService.createPatient({...info, profile_img });
  
      // Response
      res.status(200).json({ Success: true, message: userData });
  
    } catch (error) {
      res.status(500).json({ Success: false, message: error.message }) 
    }
};


export{ register }