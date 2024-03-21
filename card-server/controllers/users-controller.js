const jwt = require("../token/jwt");
const users = require("../models/users-model");


loginUser = async (req, res) => {
    const tokenFromClient = req.header("x-auth-token");
    if (tokenFromClient) {
        const userData = jwt.verifyToken(tokenFromClient);
        if (userData) {
            // User is already logged in, so send back the same token
            res.send(tokenFromClient);
            return;
        }
    }
    // User is not logged in, so check if the email and password are valid
    const { email, password } = req.body;
    await users.findOne({ email: email, password: password }, { password: 0, createdAt: 0, updatedAt: 0 })
        .then(user => {
            if (!user) {
                // User not found or password incorrect
                res.status(401).json({ message: "Invalid email or password" });
                return;
            } else {
                // User found, so generate a new token and send it back
                const userDataForToken = {
                    email: user.email,
                    isAdmin: user.isAdmin,
                    isBusiness: user.isBusiness,
                    firstName: user.name.first,
                    id: user._id,
                };
                const token = jwt.getToken(userDataForToken);
                res.send(token);
            }
        });
}

getUserByID = async (req, res) => {
    await users.findOne({ _id: req.params.id }, { password: 0, createdAt: 0, updatedAt: 0 })
        .then(user => {
            if (!user) {
                res.status(404).json({ error: "User not found" });
            } else {
                res.json(user);
            }
        });
}

createUser = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "You must provide user details",
        })
    }

    const user = new users(body)

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: user._id,
                message: "User created successfully",
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: "Failed creating user",
            })
        })
}

updateUser = (req, res) => {
    const tokenFromClient = req.header("x-auth-token");
    const userData = jwt.verifyToken(tokenFromClient);

    if (userData) {
        const updatedUser = req.body;
        users.findOneAndReplace({ _id: { $eq: userData.id } }, updatedUser, null, (err, user) => {
            if (err) {
                console.log(err);
                res.send(404).send("User not found");
            }
            else {
                res.status(201).send({ message: "User updated successfully." });
            }
        })
    } else {
        res.status(401).send("Log in first");
    }
}

module.exports = {
    loginUser,
    getUserByID,
    createUser,
    updateUser
}