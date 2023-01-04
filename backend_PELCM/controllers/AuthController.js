const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
    const { username } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ username });
    } catch (err) {
        console.log(err);
    }

    if (existingUser) {
        return res
            .status(400)
            .json({ message: "User already exist... Login instead." });
    }

    req.body.password = bcrypt.hashSync(req.body.password);
    const newUser = new User(req.body);

    try {
        const user = await newUser.save();
        const token = jwt.sign(
            {
                username: user.username,
                id: user._id,
            },
            process.env.JWT_KEY,
            { expiresIn: "1h" }
        );
        return res.status(201).json({ user, token });
    } catch (err) {
        console.log(err);
    }
};

const login = async (req, res, next) => {
    const { username, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ username });
    } catch (err) {
        console.log(err);
    }

    if (!existingUser) {
        return res
            .status(404)
            .json({ message: "Username or password is incorrect." });
    }

    const isPassswordCorrect = bcrypt.compareSync(
        password,
        existingUser.password
    );

    if (!isPassswordCorrect) {
        return res
            .status(400)
            .json({ message: "Username or password is incorrect" });
    }
    const token = jwt.sign(
        {
            username: existingUser.username,
            id: existingUser._id,
        },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
    );
    return res.status(201).json({ existingUser, token });
    // return res.status(200).json({ message: "Login successfull!" });
};

module.exports = { signup, login };
