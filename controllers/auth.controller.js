const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.status !== "active") {
            return res.status(403).json({ message: "User account is inactive" });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
                permissions: user.permissions
            },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE || "1d" }
        );

        // ✅ SET JWT IN COOKIE
        res.cookie("accessToken", token, {
            httpOnly: true,              // VERY IMPORTANT
            secure: true,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            path: "/",
        });

        return res.json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                permissions: user.permissions,
                userDetails: user.userDetails
            }
        });

    } catch (error) {
        console.error("Login error:", error); // 🔥 Log the error
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.logout = async (req, res) => {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

        return res.status(200).json({
            message: "Logged out successfully",
        });
    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({
            message: "Logout failed",
        });
    }
};
