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
    await users.findOne({ email: email, password: password }, { password: 0, createdAt: 0, updatedAt: 0, __v: 0 })
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
    await users.findOne({ _id: req.params.id }, { password: 0, createdAt: 0, updatedAt: 0, __v: 0 })
        .then(user => {
            if (!user) {
                res.status(404).json({ error: "User not found" });
            } else {
                res.json(user);
            }
        });
}

createUser = async (req, res) => {
    const body = req.body

    if (Object.keys(body).length === 0) {
        return res.status(400).json({
            success: false,
            error: "You must provide user details",
        })
    }

    const user = new users(body)

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    await user
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
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

updateUser = async (req, res) => {
    const tokenFromClient = req.header("x-auth-token");
    const userData = jwt.verifyToken(tokenFromClient);

    if (userData && (userData.id === req.params.id || userData.isAdmin)) {
        const updatedUser = req.body;

        if (Object.keys(updatedUser).length === 0) {
            return res.status(400).json({
                success: false,
                error: "You must provide user details",
            })
        }

        await users.findOneAndUpdate({ _id: req.params.id }, {
            $set: {
                name: updatedUser.name,
                phone: updatedUser.phone,
                email: updatedUser.email,
                address: updatedUser.address,
                image: updatedUser.image
            }
        }, { password: 0, createdAt: 0, updatedAt: 0, __v: 0, runValidators: true })
            .then(user => {
                if (!user) {
                    return res
                        .status(404)
                        .json({ success: false, error: "User not found" })
                }
                else {
                    return res.status(200).json({
                        success: true,
                        message: "User updated successfully"
                    })
                }
            })
            .catch(error => {
                return res.status(400).json({
                    error: error,
                    message: "Failed to update user",
                })
            })
    } else {
        res.status(401).send("Unauthorized");
    }
}

module.exports = {
    loginUser,
    getUserByID,
    createUser,
    updateUser
}