const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/authModel");
const { jwtToken } = require("../config/jwtToken");

const createUserCtrl = async (req, res) => {
    const { email, name, password } = req.body;
    const saltRounds = 10;

    try {
        const findUser = await User.findOne({ email });
        if (findUser) {
            return res.status(409).json({ error: { userErr: 'User already exists. Please login.' } });
        }

        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            name,
            email,
            password: passwordHash,
        });

        return res.status(200).json(newUser);
    } catch (error) {
        console.error('Error in user creation:', error);
        return res.status(500).json({ error: 'Server Error' });
    }
};

const loginUserCtrl = async (req, res) => {
    const { email, password } = req.body;

    try {
        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(404).json({ error: { wrngEmail: 'Incorrect email or not found.' } });
        }

        const isPasswordMatched = await bcrypt.compare(password, findUser.password);
        if (!isPasswordMatched) {
            return res.status(400).json({ error: { wrngPass: 'Wrong Password' } });
        }

        const token = jwtToken(findUser._id);
        await User.findByIdAndUpdate(findUser._id, { token }, { new: true });

        return res.json({
            _id: findUser._id,
            name: findUser.name,
            email: findUser.email,
            role: findUser.role,
            token,
        });
    } catch (error) {
        console.error('Error in user login:', error);
        return res.status(500).json({ error: 'Server Error' });
    }
};

const userLogoutCtrl = async (req, res) => {
    const { token } = req.body;

    try {
        if (!token) {
            return res.sendStatus(204);
        }

        const user = await User.findOne({ token });
        if (user) {
            console.log('Found user:', user);
            user.token = "";
            await user.save();
            console.log('Token cleared and user saved');
        } else {
            console.log('No user found with token:', token);
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Error in user logout:', error);
        res.sendStatus(500);
    }
};

const createAdminCtrl = async (req, res) => {
    const { email, name, password } = req.body;
    const saltRounds = 10;

    try {
        const findUser = await User.findOne({ email });
        if (findUser) {
            return res.status(409).json({ error: { userErr: 'Admin already exists. Please login.' } });
        }

        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);
        const newAdmin = await User.create({
            name,
            email,
            password: passwordHash,
            role: 'admin',
        });

        return res.status(200).json(newAdmin);
    } catch (error) {
        console.error('Error in admin creation:', error);
        return res.status(500).json({ error: 'Server Error' });
    }
};

const adminLoginCtrl = async (req, res) => {
    const { email, password } = req.body;

    try {
        const findUser = await User.findOne({ email });
        if (!findUser || findUser.role !== 'admin') {
            return res.status(404).json({ error: { wrngEmail: 'Admin not found or not authorized.' } });
        }

        const isPasswordMatched = await bcrypt.compare(password, findUser.password);
        if (!isPasswordMatched) {
            return res.status(400).json({ error: { wrngPass: 'Wrong Password' } });
        }

        const token = jwtToken(findUser._id);
        await User.findByIdAndUpdate(findUser._id, { token }, { new: true });

        return res.json({
            _id: findUser._id,
            name: findUser.name,
            email: findUser.email,
            role: findUser.role,
            token: jwtToken(findUser._id)
        });
    } catch (error) {
        console.error('Error in admin login:', error);
        return res.status(500).json({ error: 'Server Error' });
    }
};

const adminLogoutCtrl = async (req, res) => {
    const { token } = req.body;

    try {
        if (!token) {
            return res.sendStatus(204);
        }

        const user = await User.findOne({ token });
        if (user) {
            user.token = "";
            await user.save();
        }

        res.sendStatus(204);
    } catch (error) {
        console.error('Error in admin logout:', error);
        res.sendStatus(500);
    }
};

module.exports = { createUserCtrl, loginUserCtrl, userLogoutCtrl, createAdminCtrl, adminLoginCtrl, adminLogoutCtrl };