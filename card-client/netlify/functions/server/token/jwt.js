const jwt = require("jsonwebtoken");

const key = process.env.REACT_APP_JWT_SECRET;

const verifyToken = (tokenFromClient) => {
    const userDataFromPayload = jwt.verify(tokenFromClient, key, function (err, decoded) {
        if (err) {
            console.log("error: " + err);
        }
        return decoded;
    });
    return userDataFromPayload;
};

const getToken = (userDataForToken) => {
    return jwt.sign(userDataForToken, key, {
        expiresIn: process.env.REACT_APP_JWT_EXPIRES_IN,
    });
};

module.exports = {
    verifyToken,
    getToken
}