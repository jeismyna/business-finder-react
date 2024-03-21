const jwt = require("jsonwebtoken");

const key = "secret";

const verifyToken = (tokenFromClient) => {
    try {
        const userDataFromPayload = jwt.verify(tokenFromClient, key);
        return userDataFromPayload;
    } catch (error) {
        return null;
    }
};

const getToken = (userDataForToken) => {
    return jwt.sign(userDataForToken, key);
};

module.exports = {
    verifyToken,
    getToken
}