const router = require("express").Router();
let GoodsDonation = require("../models/GoodsDonation");

router.route("/addGoodsDonation").post(async (req, res) => {
    const { donorId, donateDate, note, donateGoods } = req.body;

    const newGoodsDonation = new GoodsDonation({
        donorId,
        donateDate,
        note,
        donateGoods
    });

    newGoodsDonation.save().then(()=>{  //then means a javascript promise
        res.json("Donation Added"); //send the message in json format
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({ error: err.message }); // Internal server error
    })  
});

router.route("/getAllGoodsDonations").get((req,res)=>{
    GoodsDonation.find().then((goodsDonations)=>{
        res.json(goodsDonations);
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({ error: err.message }); // Internal server error
    })
});

router.route("/updateGoodsDonation/:id").put(async (req, res) => {
    try {
        const donationId = req.params.id;
        const { donorId, donateDate, note, donateGoods } = req.body;

        const updatedGoodsDonationData = {
            donorId,
            donateDate,
            note,
            donateGoods
        };

        const updatedGoodsDonation = await GoodsDonation.findByIdAndUpdate(donationId, updatedGoodsDonationData, { new: true });
        if (!updatedGoodsDonation) {
            return res.status(404).json({ error: "Donation not found" });
        }

        res.status(200).json({ status: "Donation Updated", updatedGoodsDonation });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error with updating data", error: error.message });
    }
});

router.route("/deleteGoodsDonation/:id").delete(async (req, res) => {
    let donationId = req.params.id;

    await GoodsDonation.findByIdAndDelete(donationId).then(() => {
            res.status(200).send({ status: "Donation deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete donation", error: err.message });
        });
});

router.route("/getGoodsDonation/:id").get(async (req, res) => {
    try {
        const { id } = req.params;
        const goodsDonation = await GoodsDonation.findById(id);
        if (!goodsDonation) {
            return res.status(404).json({ error: "Donation not found" });
        }
        res.status(200).json(goodsDonation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
