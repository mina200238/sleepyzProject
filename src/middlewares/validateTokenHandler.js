const jwt = require("jsonwebtoken");
const validateToken = async (req, res, next) => {
    const { accessToken } = req.body;

    if (accessToken) {

        //token = authHeader.split(".")[2];
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User is not authorized");
            } else {
                console.log(accessToken);
                next()
            }

        });

        // //if (!accessToken) {
        //   //  res.status(401);
        //     //throw new Error("User is not authorized or token is missing");
        // }
    }
};

module.exports = validateToken;