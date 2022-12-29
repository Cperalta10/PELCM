const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getUser = async (req, res, next) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        if (user) {
            const { password, ...otherDetails } = user._doc;
            res.status(200).json(otherDetails);
        } else {
            res.status(400).json({ message: "user does not exist" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateUser = async (req, res, next) => {
    const id = req.params.id;
    const { currentUserId, currentUserAdminStatus, password } = req.body;

    if (id === currentUserId || currentUserAdminStatus) {
        try {
            if (password) {
                req.body.password = bcrypt.hashSync(password);
            }

            const user = await User.findByIdAndUpdate(id, req.body, {
                // gives me the updated user not prev user
                new: true,
            });

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json({
            message:
                "You don't have the power for that. You can only change your own profile!",
        });
    }
};

const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    const { currentUserId, currentUserAdminStatus } = req.body;

    if (id === currentUserId || currentUserAdminStatus) {
        try {
            await User.findByIdAndDelete(id);

            res.status(200).json({ message: "User deleted successfully." });
        } catch (error) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json({
            message:
                "You don't have the power for that. You can only delete your own profile!",
        });
    }
};

const followUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId } = req.body;

    if (currentUserId === id) {
        res.status(403).json({ message: "Action forbidden" });
    } else {
        try {
            const followUser = await User.findById(id);
            const followingUser = await User.findById(currentUserId);

            if (!followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({
                    $push: { followers: currentUserId },
                });
                await followingUser.updateOne({
                    $push: { followings: id },
                });

                res.status(200).json({ message: "User followed!" });
            } else {
                res.status(403).json({
                    message: "User is already followed by you",
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

const unfollowUser = async (req, res) => {
    const id = req.params.id;
    const { currentUserId } = req.body;

    if (currentUserId === id) {
        res.status(403).json({ message: "Action forbidden" });
    } else {
        try {
            const followUser = await User.findById(id);
            const followingUser = await User.findById(currentUserId);

            if (followUser.followers.includes(currentUserId)) {
                await followUser.updateOne({
                    $pull: { followers: currentUserId },
                });
                await followingUser.updateOne({
                    $pull: { followings: id },
                });

                res.status(200).json({ message: "User unfollowed!" });
            } else {
                res.status(403).json({
                    message: "User is not followed by you",
                });
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

const getAllUser = async (req, res, next) => {
    let users;

    try {
        users = await User.find();
    } catch (err) {
        console.log(err);
    }

    if (!users) {
        return res.status(404).json({ message: "No users found.." });
    }

    return res.status(200).json({ users });
};

module.exports = {
    getAllUser,
    getUser,
    updateUser,
    deleteUser,
    followUser,
    unfollowUser,
};
