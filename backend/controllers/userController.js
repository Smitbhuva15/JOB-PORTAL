const { userModel } = require("../modules/userschema");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { cloudinary } = require("../utils/cloudinary");
const { getDataUri } = require("../utils/datauri");


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
                message: "Please Fill Full From!!"

            });
        };

        const userisExist = await userModel.findOne({ email });

        if (!userisExist) {
            return res.status(400).json({ message: "user Is Not Exist !!" })
        }

        const isPasswordmatching = await bcrypt.compare(password, userisExist.password);

        if (!isPasswordmatching) {

            return res.status(400).json({ message: "Password or Email Incorrect !!" })
        }
        if (role !== userisExist.role) {
            return res.status(400).json({ message: "user is not Exist with this Role !!" })
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
            message: "User Log in SuccessFully !!",
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
        
       
        if (!file) {
          return res.status(400).send('No file uploaded.');
        }
       const fileurl=getDataUri(file)
        const response=await cloudinary.uploader.upload(fileurl.content)
        // console.log(response)

        if(response){
            updateData["profile.resume"]=response.secure_url
            updateData["profile.resumeOriginalName"]=file.originalname
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
          
            return res.status(400).json({ message: 'All this Datas are already exists!! ' });
        }
        console.error(error);
        return res.status(500).json({ message: "Internal server error!" });
    }
};
