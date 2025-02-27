import jwt from 'jsonwebtoken';

async function authToken(req, res, next) {
    try {

        const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1]; 
        // console.log("token", token); 

        if (!token) {
            return res.status(200).json({ // Use 401 for unauthorized access
                message: "Please Login...!",
                error: true,
                success: false
            });
        }

        // Verify the token
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
            console.log(err);
            console.log("decoded", decoded);
            
            if (err) {
                console.log("error auth", err);
                return res.status(403).json({ // Forbidden error if token is invalid
                    message: "Invalid token",
                    error: true,
                    success: false
                });
            }

            req.userId = decoded?._id; // Set userId to request object
            next(); // Proceed to the next middleware/route handler
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            data: [],
            error: true,
            success: false
        });
    }
}

export default authToken;
