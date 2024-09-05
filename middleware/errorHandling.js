export const errorHandler = (err, req, res, next) =>{
    console.log(err.message);
    res.status(500).json({status:"error",message:err.message})
}