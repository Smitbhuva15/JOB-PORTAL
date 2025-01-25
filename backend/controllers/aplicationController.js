const { applicationModel } = require("../modules/applicationschema");
const { jobModel } = require("../modules/jobschema");


exports.applyJob = async (req, res) => {
    try {
        const userData = req.user;

        const userId = userData._id;
        const jobId = req.params.id;


        const isAlreadyApply = await applicationModel.findOne({ job: jobId, applicant: userId });;
        // console.log(isAlreadyApply)

        if (isAlreadyApply) {
            return res.status(400).json({
                message: "You have already applied for this job !!"
            });
        }

        const jobexist = await jobModel.findById(jobId);
        if (!jobexist) {
            return res.status(404).json({
                message: "Job not found"
            })
        }

        const createApplication = await applicationModel.create({
            job: jobId,
            applicant: userId,
        })

        jobexist.applications.push(createApplication._id)
        await jobexist.save();
        return res.status(201).json({
            message: "Job applied successfully.",
        })

    } catch (error) {


        console.log(error);
        return res.status(500).json({ message: "Internal server error!" });
    }



}


exports.getAppliedJobs = async (req, res) => {
    try {
        const userData = req.user;
        const userId = userData._id;
        console.log(userId)

        const applicationapplybyOneUser = await applicationModel.find( {applicant:userId} ).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }
        });

        if (!applicationapplybyOneUser) {
            return res.status(404).json({
                message: "No Applications",
                success: false
            })
        };

        return res.status(200).json({
            applicationapplybyOneUser
        })



    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error!" });
    }
}


exports.updatestatus = async (req, res) => {
    try {
        const { status } = req.body;

        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({
                message: 'status is required'

            })
        };

        const isexistapplication = await applicationModel.findById({ _id: applicationId })

        // console.log(isexistapplication)

        if (!isexistapplication) {
            return res.status(404).json({
                message: "Application not found."
            })
        }
        const updatedata = {};
        if (status) updatedata.status = status

        console.log(updatedata)

        const updatebyrecruiter = await applicationModel.updateOne(
            { _id: applicationId },
            {
                $set: updatedata
            }
        )

        return res.status(200).json({
            message: "Status updated successfully."
        });


    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: "Internal server error!" });
    }
}

exports.getApplication = async (req, res) => {
    const jobId = req.params.id;


    try {
        const job = await jobModel.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });

        // console.log(job)

        if (!job) {
            return res.status(400).json({ message: "Job not found" })
        }

        return res.status(200).json({ job })

    } catch (error) {
        console.log(error);
        return res.status(5500).json({ message: "Internal server Error!!" })
    }

}


