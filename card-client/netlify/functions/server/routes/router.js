const express = require("express");

const UsersController = require("../controllers/users-controller");
const CardsController = require("../controllers/cards-controller");

const router = express.Router();

router.post("/users/login", UsersController.loginUser);
router.get("/users/:id", UsersController.getUserByID);
router.post("/users", UsersController.createUser);
router.put("/users/:id", UsersController.updateUser);

router.get("/cards", CardsController.getCards);
router.get("/cards/fav-cards", CardsController.getFavoriteCards);
router.get("/cards/my-cards", CardsController.getCardsByUserID);
router.get("/cards/:id", CardsController.getCardByID);
router.post("/cards", CardsController.createCard);
router.put("/cards/:id", CardsController.updateCard);
router.patch("/cards/:id", CardsController.updateCardLikes);
router.delete("/cards/:id", CardsController.deleteCard);

module.exports = router;