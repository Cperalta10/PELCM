const express = require("express");
const { getUser, getAllUser } = require("../controllers/UserController");

const router = express.Router();

router.get("/:id", getUser);
router.get("/users", getAllUser);

module.exports = router;
