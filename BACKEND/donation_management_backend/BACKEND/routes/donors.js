const router = require("express").Router();
let Donor = require("../models/Donor");

router.route("/add").post((req,res) =>{  //http request method is post here
    const { firstName, lastName, email, phoneNumber, nic, address } = req.body;

    const newDonor = new Donor({
        firstName,
        lastName,
        email,
        phoneNumber,
        nic,
        address
    })

    newDonor.save().then(()=>{  //then means a javascript promise
        res.json("Donor Added"); //send the message in json format
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({ error: err.message }); // Internal server error
    })  
});

router.route("/").get((req,res)=>{
    Donor.find().then((donors)=>{
        res.json(donors);
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({ error: err.message }); // Internal server error
    })
});

router.route("/update/:id").put(async (req, res) => {
    try {
        const userId = req.params.id; // Get the id as a parameter
        const { firstName, lastName, email, phoneNumber, nic, address } = req.body; // Destructure the request body

        const updatedDonorData = {
            firstName,
            lastName,
            email,
            phoneNumber,
            nic,
            address
        };

        // Use findByIdAndUpdate to update the donor by _id
        const updatedDonor = await Donor.findByIdAndUpdate(userId, updatedDonorData, { new: true }); // Update the donor and return the updated document
        if (!updatedDonor) {
            return res.status(404).json({ error: "Donor not found" }); // Return 404 if donor is not found
        }

        res.status(200).json({ status: "User Updated", updatedDonor }); // Return a success message along with the updated donor
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error with updating data", error: error.message }); // Handle errors
    }
});


router.route("/delete/:id").delete(async (req,res)=>{  //use delete method to do a delete request
    let userId = req.params.id;

    await Donor.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "User deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete user", error: err.message});
    })
})  

// Read one donor data by ID
router.route("/get/:id").get(async (req, res) => {
    try {
        const { id } = req.params;
        const donor = await Donor.findById(id);
        if (!donor) {
            return res.status(404).json({ error: "Donor not found" });
        }
        res.status(200).json(donor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//---------------------------------------------------
/*
//Route to fetch monthly donor report
router.get('/monthlyDonorReport', async (req, res) => {
    try {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        const startDate = new Date(currentYear, currentMonth, 1);
        const endDate = new Date(currentYear, currentMonth + 1, 0);

        // Query the database for donations made within the current month
        const monthlyDonors = await Donation.find({
            donationDate: { $gte: startDate, $lte: endDate }
        });

        // Respond with the monthly donor report data
        res.json(monthlyDonors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});*/


module.exports = router;
