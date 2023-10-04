import { courseModel } from "../models/course.model.js";

// Register Patient
const createCourse = async (req, res) => {
    const info = req.body;
  
    try {
      // Create course
      const userData = await courseModel.create({ info });
  
      // Response
      res.status(200).json({ Success: true, message: userData });
  
    } catch (error) {
      res.status(500).json({ Success: false, message: error.message }) 
    }
};

export{ createCourse }