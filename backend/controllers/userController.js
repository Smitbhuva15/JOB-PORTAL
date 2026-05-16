const { userModel } = require("../modules/userschema");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { cloudinary } = require("../utils/cloudinary");
const { getDataUri } = require("../utils/datauri");
const { sendOTP } = require("../utils/mailer");
const crypto = require("crypto");


exports.signup = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
   
        
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Please fill in all required fields."
            });
        }

        const file=req.file;

        if(!file){
            return res.status(400).json({message:"please upload your profile photo !!"})
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must contain at least 8 characters" });
        }
        

        const fileuri=getDataUri(file)

        const cloudResponse=await cloudinary.uploader.upload(fileuri.content);
       console.log(cloudResponse)
      
        const isExist = await userModel.findOne({ email });
        if (isExist) {
            return res.status(400).json({ message: "Email is already taken." });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);

       
        const createUser = await userModel.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url,
            }
        });

       
        return res.status(201).json({
            message: "User created successfully!",
            user: { id: createUser._id, fullname: createUser.fullname, email: createUser.email }
        });

    } catch (error) {
        console.log(error);

        // Handle validation errors
        if (error.name === "ValidationError") {
            const errorMessages = Object.values(error.errors).map(err => ` ${err.message}`);
            return res.status(400).json({ message: errorMessages});
        }

        // Handle general errors
        return res.status(500).json({ message: "Internal server error!" });
    }
};


exports.login = async (req, res) => {
    try {

        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Please fill full from!!"

            });
        };

        const userisExist = await userModel.findOne({ email });

        if (!userisExist) {
            return res.status(400).json({ message: "user is not exist !!" })
        }

        const isPasswordmatching = await bcrypt.compare(password, userisExist.password);

        if (!isPasswordmatching) {

            return res.status(400).json({ message: "password or email incorrect !!" })
        }
        if (role !== userisExist.role) {
            return res.status(400).json({ message: "User is not exist with this role !!" })
        }

        const token = jwt.sign(
            {
                fullname: userisExist.fullname,
                id: userisExist._id,
                email: userisExist.email
            },
            process.env.JWT_SCRETE_KEY,
            { expiresIn: '1d' }
        );

        user = {
            Name: userisExist.fullname,
            Id: userisExist._id,
            Email: userisExist.email,
            Role: userisExist.role,
            profile: userisExist.role,
            phoneNumber: userisExist.phoneNumber,

        }

        return res.status(200).json({
            message: "User log in successFully !!",
            Token: token,
            userDetail: user
        })



    } catch (error) {
        if (error.name ===  'ValidationError') {
            const messageErrors = Object.values(error.errors)
                .map(e => e.message);
            return res.status(500).json({ message: messageErrors });


        }
        console.log(error);
        return res.status(500).json({ message: "Internal server error !!" })
    }

}

exports.updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;

        const user = req.user;
        const userId = user._id;
        const userExist = await userModel.findById(userId);
  
        if (!userExist) {
            return res.status(400).json({ message: "User does not exist!" });
        }

       
        let updateData = {};

      
        if (fullname) updateData.fullname = fullname;
        if (email) updateData.email = email;
        if (phoneNumber) updateData.phoneNumber = phoneNumber;
        if (bio) updateData["profile.bio"] = bio;  
        if (skills) updateData["profile.skills"] = skills.split(","); 
       
        const file = req.file;
        
        if (file) {
            const fileurl = getDataUri(file);
            const response = await cloudinary.uploader.upload(fileurl.content);
            if(response){
                updateData["profile.resume"] = response.secure_url;
                updateData["profile.resumeOriginalName"] = file.originalname;
            }
        }

        const updatedUser = await userModel.updateOne(
            { _id: userId },
            { $set: updateData }  
        );
    
        const updatedUserData = await userModel.findById(userId);

        return res.status(200).json({
            message: "User profile updated successfully!",
            user: updatedUserData
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            const messageErrors = Object.values(error.errors)
                .map(e => e.message);
            return res.status(500).json({ message: messageErrors });
        }

        if (error.code === 11000) {
          
            return res.status(400).json({ message: 'All this datas are already exists!! ' });
        }
        console.error(error);
        return res.status(500).json({ message: "Internal server error!" });
    }
};

exports.forgotPasswordSendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        console.log(email)
        if (!email) {
            return res.status(400).json({ message: "Email is required." });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User with this email does not exist." });
        }

        // Generate 6-digit OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const hashedOtp = await bcrypt.hash(otp, 10);

        user.resetPasswordOtp = hashedOtp;
        user.resetPasswordOtpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        user.resetPasswordOtpVerified = false;
        user.resetPasswordResendCooldown = new Date(Date.now() + 60 * 1000); // 60 seconds
        await user.save();

        const emailSent = await sendOTP(email, otp);
        if (!emailSent) {
            return res.status(500).json({ message: "Failed to send OTP email. Please try again." });
        }

        const resetToken = jwt.sign(
            { id: user._id },
            process.env.JWT_SCRETE_KEY,
            { expiresIn: '15m' }
        );

        return res.status(200).json({
            message: "OTP sent successfully to your email.",
            resetToken
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error!" });
    }
};

exports.forgotPasswordResendOtp = async (req, res) => {
    try {
        const { resetToken } = req.body;
        if (!resetToken) {
            return res.status(400).json({ message: "Reset token is required." });
        }

        let decoded;
        try {
            decoded = jwt.verify(resetToken, process.env.JWT_SCRETE_KEY);
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired reset token." });
        }

        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (user.resetPasswordResendCooldown && user.resetPasswordResendCooldown > Date.now()) {
            return res.status(429).json({ message: "Please wait before requesting a new OTP." });
        }

        const otp = crypto.randomInt(100000, 999999).toString();
        const hashedOtp = await bcrypt.hash(otp, 10);

        user.resetPasswordOtp = hashedOtp;
        user.resetPasswordOtpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
        user.resetPasswordOtpVerified = false;
        user.resetPasswordResendCooldown = new Date(Date.now() + 60 * 1000); // 60 seconds cooldown
        await user.save();

        
        const emailSent = await sendOTP(user.email, otp);
        if (!emailSent) {
            return res.status(500).json({ message: "Failed to send OTP email." });
        }

        return res.status(200).json({ message: "New OTP sent successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error!" });
    }
};

exports.forgotPasswordVerifyOtp = async (req, res) => {
    try {
        const { resetToken, otp } = req.body;
        if (!resetToken || !otp) {
            return res.status(400).json({ message: "Reset token and OTP are required." });
        }

        let decoded;
        try {
            decoded = jwt.verify(resetToken, process.env.JWT_SCRETE_KEY);
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired reset token." });
        }

        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (!user.resetPasswordOtp || !user.resetPasswordOtpExpiry) {
            return res.status(400).json({ message: "No active OTP found." });
        }

        if (user.resetPasswordOtpExpiry < Date.now()) {
            return res.status(400).json({ message: "OTP has expired. Please request a new one." });
        }

        const isValid = await bcrypt.compare(otp.toString(), user.resetPasswordOtp);
        if (!isValid) {
            return res.status(400).json({ message: "Invalid OTP." });
        }

        user.resetPasswordOtpVerified = true;
        await user.save();

        return res.status(200).json({ message: "OTP verified successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error!" });
    }
};

exports.forgotPasswordUpdate = async (req, res) => {
    try {
        const { resetToken, newPassword } = req.body;
        if (!resetToken || !newPassword) {
            return res.status(400).json({ message: "Reset token and new password are required." });
        }
        
        if (newPassword.length < 8) {
            return res.status(400).json({ message: "Password must contain at least 8 characters" });
        }

        let decoded;
        try {
            decoded = jwt.verify(resetToken, process.env.JWT_SCRETE_KEY);
        } catch (err) {
            return res.status(401).json({ message: "Invalid or expired reset token." });
        }

        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        if (!user.resetPasswordOtpVerified) {
            return res.status(403).json({ message: "Please verify OTP before resetting password." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        
        // Clear OTP fields
        user.resetPasswordOtp = null;
        user.resetPasswordOtpExpiry = null;
        user.resetPasswordOtpVerified = false;
        user.resetPasswordResendCooldown = null;

        await user.save();

        return res.status(200).json({ message: "Password updated successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error!" });
    }
};
