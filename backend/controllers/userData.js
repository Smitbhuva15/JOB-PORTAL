
exports.userdata=(req,res)=>{
    try {
        const userdata=res.user;
        res.status(200).json({userdata});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error !!"});
        
    }
}