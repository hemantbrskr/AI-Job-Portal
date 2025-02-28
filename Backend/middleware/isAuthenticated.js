import jwt  from "jsonwebtoken";
 
const authenticateToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token)  {
            return res.status(401).json({ message: 'Token not provided', success: false });
    } 
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    if(!decoded) {
        return  (
            res.status(401).json({ message: 'Invalid token'}), (success= false ));
    }
    req.id = decode.userId;
    next();
} catch (error) {
return res.status(401).json({ message: "invalid token" });
} 
};

export default authenticateToken;  // Exporting the middleware function to be used in routes.js file.
