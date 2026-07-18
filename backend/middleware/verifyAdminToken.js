import jwt from "jsonwebtoken"

const verifyAdminToken = (req, res, next) => {
    const auth = req.headers.authorization;
    if(!auth){
        return res.status(401).json({message:"Unauthorized"})
    }
    const token = auth.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET,(err, user)=>{
        if(err){
            return res.status(403).json({
                message:"Invalid token"
            });
        }
        req.admin=user;
        next();
    })
}

export default verifyAdminToken;