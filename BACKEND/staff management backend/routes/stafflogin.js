const router = require("express").Router();
const jwt = require("jsonwebtoken");
let Stafflogin = require("../modles/Stafflogin");
let Staff = require("../modles/Staff");

// POST route for staff login
router.post("/staff_login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        // Find staff member by email
        const staffMember = await Stafflogin.findOne({ email });

        if (!staffMember) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Check if password is correct
        if (password !== staffMember.password) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // Fetch staff details from the Staff collection
        const staffDetails = await Staff.findOne({ email });

        if (!staffDetails) {
            return res.status(404).json({ message: "Staff details not found." });
        }

        // Respond with success and staff details
        res.status(200).json({ message: "Login successful.", staff: staffDetails });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});  

       


 
module.exports = router;