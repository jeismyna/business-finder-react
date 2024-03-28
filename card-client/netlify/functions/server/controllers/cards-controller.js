const jwt = require("../token/jwt");
const cards = require("../models/cards-model");

getCards = async (req, res) => {
    await cards.find({}, { createdAt: 0, updatedAt: 0, __v: 0 })
        .then(allCards => {
            if (!allCards) {
                res.status(404).json({ error: "No cards were found" });
            } else {
                res.json(allCards);
            }
        });
}

getFavoriteCards = async (req, res) => {
    const tokenFromClient = req.header("x-auth-token");
    const userData = jwt.verifyToken(tokenFromClient);

    if (userData) {
        await cards.find({ likes: userData.id }, { createdAt: 0, updatedAt: 0, __v: 0 })
            .then(favCards => {
                if (!favCards) {
                    res.status(404).json({ error: "No cards were found" });
                } else {
                    res.json(favCards);
                }
            })
    } else {
        return res.status(401).json({
            success: false,
            error: "Unauthorized"
        })
    }
}

getCardsByUserID = async (req, res) => {
    const tokenFromClient = req.header("x-auth-token");
    const userData = jwt.verifyToken(tokenFromClient);

    if (userData) {
        await cards.find({ user_id: userData.id }, { createdAt: 0, updatedAt: 0, __v: 0 })
            .then(userCards => {
                res.json(userCards);
            })
            .catch(error => {
                res.json(error);
            })
    } else {
        return res.status(401).json({
            success: false,
            error: "Unauthorized"
        })
    }
}

getCardByID = async (req, res) => {
    await cards.findOne({ _id: req.params.id }, { createdAt: 0, updatedAt: 0, __v: 0 })
        .then(card => {
            if (!card) {
                res.status(404).json({ error: "Card not found" });
            } else {
                res.json(card);
            }
        });
}

createCard = async (req, res) => {

    const body = req.body

    if (Object.keys(body).length === 0) {
        return res.status(400).json({
            success: false,
            error: "You must provide card details"
        })
    }

    const card = new cards(body)

    if (!card) {
        return res.status(400).json({ success: false, error: err })
    }
    else {
        const tokenFromClient = req.header("x-auth-token");
        const userData = jwt.verifyToken(tokenFromClient);

        if (userData && ((userData.id === card.user_id && userData.isBusiness) || userData.isAdmin)) {
            await card
                .save()
                .then(() => {
                    return res.status(201).json({
                        success: true,
                        message: "Card created successfully",
                    })
                })
                .catch(error => {
                    return res.status(400).json({
                        error,
                        message: "Failed creating card"
                    })
                })
        }
        else {
            return res.status(401).json({
                success: false,
                error: "Unauthorized"
            })
        }
    }
}

updateCard = async (req, res) => {
    const tokenFromClient = req.header("x-auth-token");
    const userData = jwt.verifyToken(tokenFromClient);

    if (userData) {
        const updatedCard = req.body;

        if (Object.keys(updatedCard).length === 0) {
            return res.status(400).json({
                success: false,
                error: "You must provide card details"
            })
        }

        const filter = userData.isAdmin ? { _id: req.params.id } : { _id: req.params.id, user_id: userData.id };

        await cards.findOneAndUpdate(filter, {
            $set: {
                title: updatedCard.title,
                subtitle: updatedCard.subtitle,
                description: updatedCard.description,
                phone: updatedCard.phone,
                email: updatedCard.email,
                web: updatedCard.web,
                image: updatedCard.image,
                address: updatedCard.address
            }
        }, { createdAt: 0, updatedAt: 0, __v: 0, runValidators: true })
            .then(card => {
                if (!card) {
                    return res
                        .status(404)
                        .json({ success: false, error: "Card not found" })
                }
                else {
                    return res.status(200).json({
                        success: true,
                        message: "Card updated successfully"
                    })
                }
            })
            .catch(error => {
                return res.status(400).json({
                    error: error,
                    message: "Failed to update card"
                })
            })
    }
    else {
        res.status(401).send("Unauthorized");
    }
}

updateCardLikes = async (req, res) => {
    await cards.findOne({ _id: req.params.id }, { createdAt: 0, updatedAt: 0, __v: 0 })
        .then(async card => {
            if (!card) {
                res.status(404).json({ error: "Card not found" });
            }
            else {
                const tokenFromClient = req.header("x-auth-token");
                const userData = jwt.verifyToken(tokenFromClient);

                if (userData) {
                    const user_id = userData.id;
                    const userLiked = card.likes.includes(user_id);
                    const updatedLikes = userLiked
                        ? card.likes.filter((id) => id !== user_id)
                        : [...card.likes, user_id];

                    card.likes = updatedLikes;
                    await card.save()
                        .then(() => {
                            return res.status(200).json({
                                success: true,
                                message: "Favorites updated successfully"
                            })
                        })
                        .catch(error => {
                            return res.status(400).json({
                                error: error,
                                message: "Failed to update favorites"
                            })
                        })
                }
                else {
                    return res.status(401).json({
                        success: false,
                        error: "Unauthorized"
                    })
                }
            }
        })
}

deleteCard = async (req, res) => {

    const tokenFromClient = req.header("x-auth-token");
    const userData = jwt.verifyToken(tokenFromClient);

    if (userData) {
        
        const filter = userData.isAdmin ? { _id: req.params.id } : { _id: req.params.id, user_id: userData.id };

        await cards.findOneAndDelete(filter, { createdAt: 0, updatedAt: 0, __v: 0 })
            .then(card => {
                if (!card) {
                    return res
                        .status(404)
                        .json({ success: false, error: "Card not found" })
                }
                else {
                    return res.status(200).json({
                        success: true,
                        message: "Card deleted successfully"
                    })
                }
            })
            .catch(error => {
                return res.status(400).json({
                    error: error,
                    message: "Failed to delete card"
                })
            })
    }
    else {
        res.status(401).send("Unauthorized");
    }
}

module.exports = {
    getCards,
    getFavoriteCards,
    getCardsByUserID,
    getCardByID,
    createCard,
    updateCard,
    updateCardLikes,
    deleteCard
}