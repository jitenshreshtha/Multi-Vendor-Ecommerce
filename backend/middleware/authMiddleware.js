const jwt = require('jsonwebtoken');

exports.protect = (req,res,next) =>{
    //get token from authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message:"No Token provided"});
    }
    try {
        //verify token using secret key
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        //attach the decoded user data to the request object
        req.user = decoded;  //contains id and role
        next();
    } catch (error) {
        res.status(401).json({message:"INvalid token"})
    }
}

exports.vendorOnly = (req,res,next) =>{

    console.log('Checking vendor access for user:', req.user); // Debug log
    console.log('User role:', req.user?.role);

    if(req.user.role?.toLowerCase() !== "vendor"){
        return res.status(403).json({message:"Access denied: vendors only"})
    }
    console.log('Vendor access granted')
    next();
}