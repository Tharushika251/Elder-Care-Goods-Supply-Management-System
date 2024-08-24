// routes/caretakers.js

const express = require('express');
const router = express.Router();
let Caretaker = require('../models/caretaker');

// Create new caretaker
router.post('/add', (req, res) => {
    const { name, age, gender, contactNumber, workfee } = req.body;
    const newCaretaker = new Caretaker({ name, age, gender, contactNumber, workfee });

    newCaretaker.save()
    .then((savedCaretaker) => {
        res.status(201).json({ status: "Caretaker saved successfully", caretaker: savedCaretaker });
    })
    .catch(error => {
        res.status(400).json({ status: "Error saving caretaker", error: error.message });
    });
});

// Read all caretakers
router.get('/', (req, res) => {
    Caretaker.find()
    .then((caretakers) => {
        res.status(200).json(caretakers);
    })
    .catch((error) => {
        res.status(500).json({ status: "Error fetching caretakers", error: error.message });
    });
});

// Update caretaker by ID
router.put('/update/:id', async (req, res) => {
    
    const { name, age, gender, contactNumber, workfee } = req.body;
    const updateCaretaker = { name, age, gender, contactNumber, workfee };

    try {
        const updated = await Caretaker.findByIdAndUpdate(req.params.id, updateCaretaker, { new: true });
        res.status(200).json({ status: "Caretaker updated", caretaker: updated });
    } catch (error) {
        res.status(500).json({ status: "Error updating caretaker", error: error.message });
    }
});

// Delete caretaker by ID
router.delete('/delete/:id', async (req, res) => {
    try {
        await Caretaker.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: "Caretaker deleted" });
    } catch (error) {
        res.status(500).json({ status: "Error deleting caretaker", error: error.message });
    }
});

// Get caretaker by ID
router.get('/get/:id', async (req, res) => {
    try {
        const caretaker = await Caretaker.findById(req.params.id);
        res.status(200).json({ status: "Caretaker fetched", caretaker });
    } catch (error) {
        res.status(500).json({ status: "Error fetching caretaker", error: error.message });
    }
});
router.get('/search/:key', async (req, res) => {
    try {
        const key = req.params.key.trim(); // Trim any extra whitespace
        console.log('Search Key:', key);

        // Construct regular expressions for case-insensitive search on name and gender
        const nameRegex = new RegExp(escapeRegExp(key), 'i'); // Escape special characters
        const genderRegex = new RegExp(escapeRegExp(key), 'i'); // Escape special characters

        // Debugging output
        console.log('Name Regex:', nameRegex);
        console.log('Gender Regex:', genderRegex);

        let result;

        // Check if the key is a valid number for numeric fields (age, contactNumber, workfee)
        if (!isNaN(key)) {
            result = await Caretaker.find({
                $or: [
                    { age: key },
                    { contactNumber: key },
                    { workfee: key }
                ]
            });
        } else {
            // For non-numeric keys, search by name and gender using regular expressions
            result = await Caretaker.find({
                $or: [
                    { name: nameRegex },
                    { gender: genderRegex }
                ]
            });
        }

        console.log('Search Result:', result);
        res.send(result);
    } catch (error) {
        console.error('Search Error:', error);
        res.status(500).send({ error: 'An error occurred while searching.', details: error.message });
    }
});

// Helper function to escape special characters in a regular expression
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters
}


module.exports = router;
