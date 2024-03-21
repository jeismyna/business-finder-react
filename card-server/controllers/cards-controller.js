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

getCardsByUserID = async (req, res) => {
    const tokenFromClient = req.header("x-auth-token");
    if (tokenFromClient) {
        const userData = jwt.verifyToken(tokenFromClient);
        await cards.find({ user_id: userData.id }, { createdAt: 0, updatedAt: 0, __v: 0 }) // Assume user_id is passed as a parameter in the body
            .then(userCards => {
                res.json(userCards);
            })
            .catch(error => {
                res.json(error);
            })
    } else {
        res.status(404).send("Login first");
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

createCard = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: "You must provide card details",
        })
    }

    const card = new cards(body)

    if (!card) {
        return res.status(400).json({ success: false, error: err })
    }

    card
        .save()
        .then(() => {
            console.log("Card created successfully");
            res.json(card);
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: "Failed creating card",
            })
        })
}

updateCard = (req, res) => {
    const updatedCard = req.body;
    cards.findOneAndUpdate({ _id: req.params.id }, 
        { $set: { 
            title: updatedCard.title, 
            subtitle: updatedCard.subtitle, 
            description: updatedCard.description,
            phone: updatedCard.phone, 
            email: updatedCard.email, 
            web: updatedCard.web, 
            image: updatedCard.image, 
            address: updatedCard.address
        }}, { createdAt: 0, updatedAt: 0, __v: 0 })
    .then(card => {
        res.json(card);
    })
    .catch(error => {
        return res.status(400).json({
            error,
            message: "Failed to update card",
        })
    })
}

updateCardLikes = async (req, res) => {
    await cards.findOne({ _id: req.params.id }, { createdAt: 0, updatedAt: 0, __v: 0 })
        .then(card => {
            if (!card) {
                res.status(404).json({ error: "Card not found" });
            }
            else {
                const tokenFromClient = req.header("x-auth-token");
                if (tokenFromClient) {
                    const userData = jwt.verifyToken(tokenFromClient);
                    const user_id = userData.id;
                    const userLiked = card.likes.includes(user_id);
                    const updatedLikes = userLiked
                        ? card.likes.filter((id) => id !== user_id)
                        : [...card.likes, user_id];

                    card.likes = updatedLikes;
                    card.save()
                        .then(() => {
                            res.json(card);
                        })
                        .catch(error => {
                            res.json(error);
                        })
                }
                else {
                    res.status(404).send("Log in first");
                }
            }
        })
}

deleteCard = (req, res) => {
    cards.findByIdAndDelete(req.params.id, { createdAt: 0, updatedAt: 0, __v: 0 })
    .then(card => {
        res.json(card);
    })
    .catch(error => {
        return res.status(400).json({
            error,
            message: "Failed to delete card",
        })
    })
}

module.exports = {
    getCards,
    getCardsByUserID,
    getCardByID,
    createCard,
    updateCard,
    updateCardLikes,
    deleteCard
}