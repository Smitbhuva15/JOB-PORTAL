const { applicationModel } = require("../modules/applicationschema");
const { jobModel } = require("../modules/jobschema");


exports.applyJob = async (req, res) => {
    try {
        const userData = req.user;
        const userId = userData._id;
        const jobId = req.params.id;

        const isAlreadyApply = await applicationModel.find({ job: jobId, applicant: userId });

        if (isAlreadyApply) {
            return res.status(400).json({
                message: "You have already applied for this jobs"
            });
        }

        const jobexist = await jobModel.findById({ job: jobId });
        if (!jobexist) {
            return res.status(404).json({
                message: "Job not found"
            })
        }

        const createApplication = await applicationModel.create({
            job: jobId,
            applicant: userId,
        })

        jobModel.applications.push(createApplication._id)
        await jobModel.save();
        return res.status(201).json({
            message: "Job applied successfully.",
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


exports.getApplication = async (req, res) => {
    try {
        const userData = req.user;
        const userId = userData._id;

        const applicationapplybyOneUser = await applicationModel.findById({ applicant: userId }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },
            }
        })

        if (!applicationapplybyOneUser) {
            return res.status(404).json({
                message: "No Applications",
                success: false
            })
        };

        return res.status(200).json({
            application
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

        if (!isexistapplication) {
            return res.status(404).json({
                message: "Application not found."
            })
        }
        const updatedata = {};
        if (status) updatedata.status = status

        const updatebyrecruiter = await applicationModel.updateOne(
            { applicant: applicationId },
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