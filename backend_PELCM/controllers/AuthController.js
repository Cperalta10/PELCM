const User = require("../models/User");
const bcrypt = require("bcryptjs");

const signup = async (req, res, next) => {
    const { username, password, firstname, lastname } = req.body;

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

    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        username,
        password: hashedPassword,
        firstname,
        lastname,
    });

    try {
        await user.save();
    } catch (err) {
        console.log(err);
    }
    return res.status(201).json({ user });
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
    return res.status(200).json({ message: "Login successfull!" });
};

module.exports = { signup, login };
