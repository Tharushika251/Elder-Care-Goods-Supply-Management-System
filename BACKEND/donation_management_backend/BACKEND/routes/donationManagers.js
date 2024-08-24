const router = require("express").Router();
let DonationManager = require("../models/DonationManager");

router.route("/addManager").post((req,res) =>{  //http request method is post here
    const { firstName, lastName, email, phoneNumber, nic, address } = req.body;

    const newDonationManager = new DonationManager({
        firstName,
        lastName,
        email,
        phoneNumber,
        nic,
        address
    })

    newDonationManager.save().then(()=>{  //then means a javascript promise
        res.json("Donation Manager Added"); //send the message in json format
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({ error: err.message }); // Internal server error
    })  
});

router.route("/").get((req,res)=>{
    DonationManager.find().then((donationManagers)=>{
        res.json(donationManagers);
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({ error: err.message }); // Internal server error
    })
});

router.route("/update/:id").put(async (req, res) => {
    try {
        const userId = req.params.id; // Get the id as a parameter
        const { firstName, lastName, email, phoneNumber, nic, address } = req.body; // Destructure the request body

        const updatedDonationManagerData = {
            firstName,
            lastName,
            email,
            phoneNumber,
            nic,
            address
        };

        // Use findByIdAndUpdate to update the donor by _id
        const updatedDonationManager = await DonationManager.findByIdAndUpdate(userId, updatedDonationManagerData, { new: true }); // Update the donor and return the updated document
        if (!updatedDonationManager) {
            return res.status(404).json({ error: "DonationManager not found" }); // Return 404 if donor is not found
        }

        res.status(200).json({ status: "User Updated", updatedDonationManager }); // Return a success message along with the updated donor
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error with updating data", error: error.message }); // Handle errors
    }
});


router.route("/delete/:id").delete(async (req,res)=>{  //use delete method to do a delete request
    let userId = req.params.id;

    await DonationManager.findByIdAndDelete(userId).then(()=>{
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
        const donationManager = await DonationManager.findById(id);
        if (!donationManager) {
            return res.status(404).json({ error: "Donation Manager not found" });
        }
        res.status(200).json(donationManager);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;