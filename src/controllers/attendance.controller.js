import { attendanceModel } from "../models/attendance.model.js";
import { userModel } from "../models/user.model.js";

// Markin Attendance
const markInAttendance = async (req, res) => {
    const { qrCodeData } = req.body;
    try {
      // Create course
      const existingUser = await userModel.findOne({ cardQRCode: qrCodeData });
        
      if (!existingUser) {
        // Student not found, return an error response
        return res.status(404).json({ error: 'Student not found' });
      }


        // Check if this user has any Active attendance
        const active = await attendanceModel.findOne({ 
            userId: existingUser._id, status: "Active" })
        console.log(active)
        if (active) {
            return res.status(404).json({ 
                error: 'This user has an Active Attendance running, Please close then come back' });
        }
        
        // Record the attendance (e.g., add a timestamp to the attendance log)
        // You can customize your attendance log schema to include additional details
        const attendanceLogEntry = {
            userId: existingUser._id,
            status: "Active",
            markedIn: new Date()
        };

        // Created Attendance

        const updatedData = await attendanceModel.create(attendanceLogEntry)
        console.log("meeeee")

        // Response
        res.status(200).json({ 
            Success: true, 
            message: `Attendance for ${existingUser.username} Marked in`,
            attendance: updatedData
        });
    } catch (error) {
      res.status(500).json({ Success: false, message: error.message }) 
    }
};

// Markout Attendance
const markOutAttendance = async (req, res) => {
    const { qrCodeData } = req.body;
  
    try {
        // Check QRCode Data
        const existingUser = await userModel.findOne({ cardQRCode: qrCodeData });
    
        if (!existingUser) {
            // Student not found, return an error response
            return res.status(404).json({ error: 'User not found' });
        }

        // find the attendance that you want to sign out for
        const markedInAttendance = await attendanceModel.findOne({ 
            userId: existingUser._id, status: "Active" })
        
        if (!markedInAttendance) throw new Error("No active attendance found")
        // Record the attendance (e.g., add a timestamp to the attendance log)
        // You can customize your attendance log schema to include additional details
        const attendanceLogEntry = {
            status: "Dormant",
            markedOut: new Date()
        };
        const id = markedInAttendance._id.toString()
        console.log(id)
        const updatedData = await attendanceModel.findByIdAndUpdate(
            id, { status: "Dormant", markedOut: new Date() }, { new: true}
        )

        // Response
        res.status(200).json({ 
            Success: true, 
            message: `Attendance for ${existingUser.username} Marked Out`,
            attendance: updatedData
        });
  
    } catch (error) {
      return res.status(500).json({ Success: false, message: error.message }) 
    }
};

// Markout Attendance
const getUserSession = async (req, res) => {
    const userId = req.params.userId;
  
    try {
        // get User info
        const existingUser = await userModel.findOne({ _id : userId })
        console.log(existingUser)
        if (!existingUser) {
            // Student not found, return an error response
            return res.status(404).json({ error: 'User Id does not exist' });
        }
        
        // Check QRCode Data
        const existingAttendance = await attendanceModel.find({ userId });
        
        if (!existingAttendance.length == 0) {
            // Student not found, return an error response
            return res.status(404).json({ error: 'User has no attendance yet ' });
        }

        

        // Response
        res.status(200).json({ 
            Success: true, 
            message: `Attendance for ${existingUser.username} successfully fetched`,
            attendance: existingAttendance
        });
  
    } catch (error) {
      return res.status(500).json({ Success: false, message: error.message }) 
    }
};


export{ markInAttendance, markOutAttendance, getUserSession }