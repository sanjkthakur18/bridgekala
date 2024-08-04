const User = require('../models/authModel');
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("Decoded token:", decoded);
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            req.user = user;
            next();
        } catch (error) {
            console.error("Auth middleware error:", error);
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ error: "Invalid token" });
            }
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ error: "Token expired. Please login again." });
            }
            res.status(500).json({ error: "Server error" });
        }
    } else {
        console.log("No token found in headers");
        res.status(401).json({ error: "No token provided" });
    }
};

const isAdmin = async (req, res, next) => {
    const { email } = req.user;
    const adminUser = await User.findOne({ email });
    if (adminUser.role !== "admin") {
        return res.status(403).json({ message: "You are not an admin." });
    }
    else {
        next();
    }
};

module.exports = { authMiddleware, isAdmin };