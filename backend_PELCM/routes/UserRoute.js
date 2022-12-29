const express = require("express");
const {
    getUser,
    getAllUser,
    updateUser,
    deleteUser,
    followUser,
    unfollowUser,
} = require("../controllers/UserController");

const router = express.Router();

router.get("/:id", getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.put("/:id/follow", followUser);
router.put("/:id/unfollow", unfollowUser);
router.get("/users", getAllUser);

module.exports = router;
