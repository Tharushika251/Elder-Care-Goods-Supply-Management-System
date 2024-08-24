// routes/newpackages.js

const express = require('express');
const router = express.Router();
let Newpackage = require('../models/newpackage');

// Create new package
router.post('/add1', (req, res) => {
    const { nPname, nPdescription, nPprice } = req.body;
    const newNewpackage = new Newpackage({ nPname, nPdescription, nPprice });

    newNewpackage.save()
    .then((savedNewpackage) => {
        res.status(201).json({ status: "New package saved successfully", newpackage: savedNewpackage });
    })
    .catch(error => {
        res.status(400).json({ status: "Error saving newpackage", error: error.message });
    });
});

// Read all Newpackage
router.get('/', (req, res) => {
    Newpackage.find()
    .then((newpackages) => {
        res.status(200).json(newpackages);
    })
    .catch((error) => {
        res.status(500).json({ status: "Error fetching newpackages", error: error.message });
    });
});

// Update newpackage by ID
router.put('/update1/:id', async (req, res) => {
    
    const {  nPname, nPdescription, nPprice } = req.body;
    const updateNewpackage = {  nPname, nPdescription, nPprice };

    try {
        const updated = await Newpackage.findByIdAndUpdate(req.params.id, updateNewpackage, { new: true });
        res.status(200).json({ status: "Newpackage updated", newpackage: updated });
    } catch (error) {
        res.status(500).json({ status: "Error updating New package", error: error.message });
    }
});

// Delete newpackage by ID
router.delete('/delete1/:id', async (req, res) => {
    try {
        await Newpackage.findByIdAndDelete(req.params.id);
        res.status(200).json({ status: "New package deleted" });
    } catch (error) {
        res.status(500).json({ status: "Error deleting New package", error: error.message });
    }
});

// Get newpackage by ID
router.get('/get1/:id', async (req, res) => {
    try {
        const newpackage = await Newpackage.findById(req.params.id);
        res.status(200).json({ status: "New package fetched", newpackage });
    } catch (error) {
        res.status(500).json({ status: "Error fetching New package", error: error.message });
    }
});

/*router.get('/search/:key', async (req, res) => {
    try {
        const key = req.params.key.trim(); // Trim any extra whitespace
        console.log('Search Key:', key);

        // Check if the key is a valid number for numeric fields
        
        const nPpriceQuery = !isNaN(key) ? parseInt(key) : key;
        
        console.log('Price of standard package Query:', nPpriceQuery);

        let result = await Newpackage.find({
            $or: [
                { nPname: { $regex: key, $options: 'i' } },
                { nPdescription: { $regex: key, $options: 'i' } },
                { nPprice: nPpriceQuery }
            ]
        });

        console.log('Search Result:', result);
        res.send(result);
    } catch (error) {
        console.error('Search Error:', error);
        res.status(500).send({ error: 'An error occurred while searching.', details: error.message });
    }
});*/
router.get('/search/:key', async (req, res) => {
    try {
        const key = req.params.key.trim(); // Trim any extra whitespace
        console.log('Search Key:', key);

        // Construct regular expressions for case-insensitive search on name and gender
        const npnameRegex = new RegExp(escapeRegExp(key), 'i'); // Escape special characters
        const descriptionRegex = new RegExp(escapeRegExp(key), 'i'); // Escape special characters

        // Debugging output
        console.log('Name Regex:', npnameRegex);
        console.log('Description Regex:', descriptionRegex);

        let result;

        // Check if the key is a valid number for numeric fields (age, contactNumber, workfee)
        if (!isNaN(key)) {
            result = await Newpackage.find({
                $or: [
                    { nPprice: key }
                ]
            });
        } else {
            // For non-numeric keys, search by name and gender using regular expressions
            result = await Newpackage.find({
                $or: [
                    { nPname: npnameRegex },
                    { nPdescription: npnameRegex }
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
