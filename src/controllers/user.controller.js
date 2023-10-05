import { userModel } from "../models/user.model.js";
import { storeImage } from "../configs/cloudinary.config.js";
import { encode_jwt } from "../configs/jwt.config.js";
import { v4 as uuidv4 } from 'uuid';
import qr from 'qrcode'

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

      // Create a unique card Code
      const uuid = uuidv4();

      // Remove dashes to get a 32-character code
      const cardQRCode = uuid.replace(/-/g, '');

      // Create User
      const userData = await userModel.create({...info, profile_img, cardQRCode });
  
      // Response
      res.status(200).json({ Success: true, message: userData });
  
    } catch (error) {
      res.status(500).json({ Success: false, message: error.message }) 
    }
};

// login user
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
      user: existingUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Fetch my Profile
const getUserByID = async (req, res) => {
  const _id = req.params.id
  try {
    const myProfile = await userModel.findOne({ _id });

    if (!myProfile) throw new Error("User does not exist")

    res.status(201).json({
      success: true,
      message: "User Fetched successfully",
      data: myProfile,
    })
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};

// Fetch users by Role
const getUsersByRole = async (req, res) => {
  const role = req.params.role
  try {
    const myProfile = await userModel.find({ role });

    if (!myProfile) throw new Error("User does not exist")

    res.status(201).json({
      success: true,
      message: "User Fetched successfully",
      data: myProfile
    })
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};

// Fetch users
const getAllUsers = async (req, res) => {
  const role = req.params.role
  try {
    const myProfile = await userModel.find();

    res.status(201).json({
      success: true,
      message: "User Fetched successfully",
      data: myProfile
    })
  } catch (error) {
    res.status(403).json({ success: false, message: error.message });
  }
};

// Update a user
const updateUserRole = async (req, res) => {
  const updateData = req.body
  const id = req.params.id
  
  try{
      // Check if selected email is already taken
      if(updateData.username){
          const emailAvailable = await userModel.findOne({ username: updateData.username })
              
          // throws an error if the username selected is taken
          if (emailAvailable){ 
            return res.status(403).json({ 
              success: false, 
              message: 'User with updated email already exists'
            })
          }
      }

      // profile Picture
      if (req.files !== undefined) {
        if (req.files.profile_img !== undefined) {
          var profile_img = await storeImage(req.files.profile_img.path)
        } 
      }

      const updatedData = await userModel.findByIdAndUpdate(
        id, {...updateData, profile_img}, { new: true}
      )

      return res.status(200).json({ 
          success: true, 
          message: 'User updated successfully', 
          data: updatedData 
      })
  } 
  catch (error) {
      return res.status(401).json({ success: false, message: error.message })                       
  }    
}

// Generate QR Code
const generateQR = async (req, res) => {
  try {
    const _id = req.user; // Data for the QR code

    const user = await userModel.findOne({ _id });

    // Generate the QR code
    const qrCode = await qr.toDataURL(user.cardQRCode);

    // Send the QR code image as a response
    return res.status(200).json({ 
      success: true, 
      message: 'QR Code Generated Successfully', 
      data: `<img src="${qrCode}" alt="QR Code">`
  })
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

// Generate QR Code
const generateQRAdmin = async (req, res) => {
  const studentId = req.params.userId
  try {
    const _id = studentId; // Data for the QR code

    const user = await userModel.findOne({ _id });

    // if this user doesn't exist throw error
    if(!user){
      return res.status(404).json({ message: "User does not exist" });
    }

    // Generate the QR code
    const qrCode = await qr.toDataURL(user.cardQRCode);

    // Send the QR code image as a response

    return res.status(200).send({ 
      success: true, 
      message: 'QR Code Generated Successfully', 
      data: `<img src="${qrCode}" alt="QR Code">`
    })
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}

export{ register, login, getUserByID, getUsersByRole, updateUserRole, generateQR, generateQRAdmin, getAllUsers }