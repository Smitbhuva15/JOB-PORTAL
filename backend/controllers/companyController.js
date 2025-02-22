const { companyModel } = require("../modules/companyschema");
const { cloudinary } = require("../utils/cloudinary");
const { getDataUri } = require("../utils/datauri");


exports.registercompany = async (req, res) => {
    try {

        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required!!."
            });
        }

        const isCompanyExist = await companyModel.findOne({ name: companyName })
        if (isCompanyExist) {
            return res.status(400).json({
                message: "Company name is allready Exist, please try with another name !!."
            });
        }
        const userData = req.user;
        const userId = userData._id;

        const createCompany = await companyModel.create(
            {
                name: companyName,
                userId: userId

            }
        )

        return res.status(201).json({
            message: "Company registered successfully.",
            createCompany
        })


    } catch (error) {


       

        // Handle validation errors
        if (error.name === "ValidationError") {
            const errorMessages = Object.values(error.errors).map(err => ` ${err.message}`);
            return res.status(400).json({ message: errorMessages });
        }

        console.log(error);
        return res.status(500).json({ message: "Internal server error!" });

    }
}

exports.getcompany = async (req,res) => {
    const userData = req.user;
    const userId = userData._id;
    try {
        const companies=await companyModel.find({userId:userId})
        if(!companies){
            return res.status(404).json({
                message: "Companies not found."
                
            })
        }
        return res.status(200).json({
            companies
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error!" });
    }
}

exports.getcompanybyId=async(req,res)=>{
    const companyId=req.params.id;
    try {
        const companie=await companyModel.findById({_id:companyId})
        if(!companie){
            return res.status(404).json({
                message: "Companie not found."
                
            })
        }
        return res.status(200).json({
            companie
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error!" });
    }

}

exports.updatecompany=async(req,res)=>{
    try {

        const { name, description, website, location } = req.body;
        const updatedata={};
        console.log(location,name)

        if(name)updatedata.name=name
        if(description)updatedata.description=description
        if(website)updatedata.website=website
        if(location)updatedata.location=location
       
        const file=req.file;
        // console.log( name, description, website, location,file)

        if(!file){
            return res.status(400).json({message:"please upload the company logo !!"})
        }
    

       const fileuri=getDataUri(file)

        const cloudResponse=await cloudinary.uploader.upload(fileuri.content);
    //   console.log(cloudResponse)
      if(cloudResponse){
        updatedata.logo=cloudResponse.secure_url
      }

        const updateonecompany=await companyModel.updateOne(
            {_id:req.params.id},
            {
                $set:updatedata
            },
        )

        if (!updateonecompany) {
            return res.status(404).json({
                message: "Company not found."
              
            })
        }

        return res.status(200).json({
            message:"Company information updated."
           
        })

        
    } catch (error) {
        
        if (error.name === "ValidationError") {
            const errorMessages = Object.values(error.errors).map(err => ` ${err.message}`);
            return res.status(400).json({ message: errorMessages });
        }
        if (error.code === 11000) {
          
            return res.status(400).json({ message: 'All this Datas are already exists ' });
        }

        console.log(error);
        return res.status(500).json({ message: "Internal server error!" });
    }
}