import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const SignUp = async (req, res) => {
    const { mobile, password } = req.body;
    if (mobile.length !== 10) {
        return res.status(400).json({ message: "Mobile number should be 10 digit" });
    }
    const passwordregex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
    if (!passwordregex.test(password)) {
        return res.status(400).json({ message: "Password should be at least 8 characters, containing at least one alphabet, number and one special character" });
    }
    const userdata = await User.findOne({ mobile: mobile });
    if (userdata) {
        return res.status(400).json({ message: "User already exists" });
    }
    const user = new User({ mobile, password });
    try {
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};


export const AllUsers = async (req, res) => {
    const users = await User.find({}, { mobile: 1, _id: 0 });
    res.status(200).json(users);
};

export const Login = async (req, res) => {
    const { mobile, password } = req.body;
    const user = await User.findOne({ mobile: mobile });
    if (!user) {
        return res.status(400).json({ message: "User does not exists" });
    }
    if (user.password !== password) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ mobile: user.mobile, id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    res.status(200).json({ token });
};