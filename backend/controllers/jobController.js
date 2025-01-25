
const { jobModel } = require("../modules/jobschema");


exports.postjob = async (req, res) => {
    const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
    try {
        const userData = req.user;
        const userId = userData._id;
        // console.log(userId)


        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Please fill all the Fields",
            })
        };

        const createnewjob = await jobModel.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            created_by: userId,
            company: companyId,

        })

        return res.status(201).json({
            message: "New job created successfully.",
            createnewjob
        });

    } catch (error) {
        console.log(error);

        // Handle validation errors
        if (error.name === "ValidationError") {
            const errorMessages = Object.values(error.errors).map(err => ` ${err.message}`);
            return res.status(400).json({ message: errorMessages });
        }

        // Handle general errors
        return res.status(500).json({ message: "Internal server error!" });
    }
}


exports.getAllJobs = async (req, res) => {

    try {
        const keyword = req.query.keyword || "";
        // console.log(keyword)

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };

        const allJobs = await jobModel.find(query)
            .populate({
                path: "company"
            }).sort({ createdAt: -1 })
        if (!allJobs) {
            return res.status(404).json({
                message: "Jobs not found."

            })
        };

        console.log(allJobs)
        return res.status(200).json({
            allJobs

        })

    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: "Internal server error!" });
    }

}

exports.getjobById = async (req, res) => {

    try {
        const jobId = req.params.id;
        const job = await jobModel.findById({ _id: jobId });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found."

            })
        };
        return res.status(200).json({
            job
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error!" });
    }
}


exports.getAdminjobs = async (req, res) => {
    try {
        const userData = req.user;
        const adminId = userData._id;

        const jobs = await jobModel.find({ created_by: adminId }).populate({
            path: 'company',
            createdAt: -1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found."

            })
        };
        return res.status(200).json({
            jobs
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error!" });
    }
}


exports.updateJob = async (req, res) => {

    const jobId = req.params.id
    try {


        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        console.log(experience)
        const updatedata = {};
        if (title) updatedata.title = title
        if (description) updatedata.description = description
        if (requirements) updatedata.requirements = requirements
        if (salary) updatedata.salary = salary
        if (location) updatedata.location = location
        if (jobType) updatedata.jobType = jobType
        if (experience) updatedata.experienceLevel = experience
        if (position) updatedata.position = position
        if (companyId) updatedata.companyId = companyId

        const isExist = await jobModel.findOne({ _id: jobId });

        if (!isExist) {
            return res.status(400).json({ message: "Job Is Not Found !!" })
        }

        const updatejob = await jobModel.updateOne(
            { _id: jobId },
            {
                $set: updatedata
            }
        )
        return res.status(200).json({message:"Job Updated successFully !!"})

    } catch (error) {

        if (error.name === "ValidationError") {
            const errorMessages = Object.values(error.errors).map(err => ` ${err.message}`);
            return res.status(400).json({ message: errorMessages });
        }
        if (error.code === 11000) {
          
            return res.status(400).json({ message: 'All this Datas are already exists ' });
        }

        console.log(error)
        return res.status(500).json({ message: "Internal server error!" });
    }



}