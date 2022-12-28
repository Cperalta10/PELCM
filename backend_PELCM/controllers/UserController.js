const User = require("../models/User");

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

    if (id === currentUserId) {
    }

    // try {
    //     const user = await User.findById(id);
    //     if (user) {
    //         const { password, ...otherDetails } = user._doc;
    //         res.status(200).json(otherDetails);
    //     } else {
    //         res.status(400).json({ message: "user does not exist" });
    //     }
    // } catch (err) {
    //     res.status(500).json(err);
    // }
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

module.exports = { getAllUser, getUser, updateUser };
