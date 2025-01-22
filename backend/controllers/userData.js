
exports.userdata=(req,res)=>{
    try {
        const userdata=req.user;
        res.status(200).json({userDetail:userdata});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error !!"});
        
    }
}