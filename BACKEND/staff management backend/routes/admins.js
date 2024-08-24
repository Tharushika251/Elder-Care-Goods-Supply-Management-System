const router = require("express").Router();
const jwt = require("jsonwebtoken");
let Admin = require("../modles/Admin");

router.route("/adminlogin").post((req, res) => {
    const { email, password } = req.body;

    // Check if the email and password are provided
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    // Assuming Admin.findOne() is a method to find admin by email and password
    Admin.findOne({ email, password }).then(admin => {
        if (!admin) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Generate token
        const token = jwt.sign({role:"admin", email: email }, "jwt_secret_key", { expiresIn: "1d" });

        // Set token in a cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24, // 1 day in milliseconds
            sameSite: 'strict', // Prevents CSRF attacks
            secure: process.env.NODE_ENV === 'production' // Set secure flag in production
        });

        // Respond with success and token
        res.status(200).json({ message: "Login successful.", token });
    }).catch(err => {
        console.error("Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    });
});

router.get('/admin_count', async (req, res) => {
    try {
        const adminCount = await Admin.countDocuments();
        return res.json({ status: true, result: { admin: adminCount } });
    } catch (error) {
        console.error('Error fetching admin count:', error);
        return res.json({ status: false, error: 'Failed to fetch admin count' });
    }
});

router.get('/admin_records', async (req, res) => {
    try {
        // Retrieve all admin records from MongoDB
        const adminRecords = await Admin.find();
        return res.json({ status: true, result: adminRecords });
    } catch (error) {
        console.error('Error fetching admin records:', error);
        return res.json({ status: false, error: 'Query Error' });
    }
});

router.get('/logout', async (req, res) => {
    res.clearCookie('token')
    return res.json({status: true})
});


module.exports = router;