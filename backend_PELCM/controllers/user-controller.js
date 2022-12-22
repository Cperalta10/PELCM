const User = require("../model/User");
const bcrypt = require("bcryptjs")

const getAllUser = async (req, res, next) => {
    let users;

    try{
        users = await User.find();
    } catch(err) {
        console.log(err);
    }

    if (!users) {
        return res.status(404).json({ message: "No users found.." });
    }

    return res.status(200).json({ users })
}

const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    let existingUser;

    try{
        existingUser = await User.findOne({ email });
    } catch(err) {
        console.log(err);
    }

    if (existingUser) {
        return res.status(400).json({ message: "User already exist... Login instead." });
    }

    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name, 
        email, 
        password: hashedPassword,
    })

    try{
        await user.save();
    } catch(err) {
        console.log(err)
    }
    return res.status(201).json({ user })
}

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;

    try{
        existingUser = await User.findOne({ email });
    } catch(err) {
        console.log(err)
    }

    if (!existingUser) {
        return res.status(404).json({ message: "Email or password is incorrect." });
    }

    const isPassswordCorrect = bcrypt.compareSync(password, existingUser.password);
    
    if (!isPassswordCorrect) {
        return res.status(400).json({ message: "Email or password is incorrect" });
    }
    return res.status(200).json({ message: "Login successfull!" });
}


module.exports = {getAllUser, signup, login};

