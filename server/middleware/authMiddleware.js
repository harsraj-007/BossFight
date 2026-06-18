const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) =>{

    try{

        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.status(401).json({
                error: "No token provided",
            })
        }

        const token = authHeader.split(" ")[1]; // ["Bearer", "eyJhbGciOi..."] so ["eyJHbG"]

        // const token = authHeader.split("")[1];  => ['B','e','a','r'] so ['e']



        if(!token){
            return res.status(401).json({
                error: "No token provided",
            })
        }

        const decoded = jwt.verify( token, "secretkey");

        req.user = decoded;
        
        // req.user = decoded();

        next();


    }catch(error){
        res.status(401).json({
            error: "Invalid token",
        });
    }
    
};


module.exports = authMiddleware;


