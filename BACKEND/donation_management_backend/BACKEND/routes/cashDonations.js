const router = require("express").Router();
const Donation = require("../models/CashDonation");

router.route("/addDonation").post(async (req, res) => {
    const { donorId, donationType, donateDate, deliverType, note, donateAmount, paymentMethod, donateGoods } = req.body;

    let donationSlips = [];

    if (req.files && req.files.length > 0) { // Change: Check if files are sent
        donationSlips = req.files.map((file) => {
            return file.path;
        });
    }

    const newDonation = new Donation({
        donorId,
        donationType,
        donateDate,
        deliverType,
        note,
        donateAmount,
        paymentMethod,
        donationSlips,
        donateGoods
    });

    try {
        const savedDonation = await newDonation.save();
        res.json(savedDonation);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.route("/").get((req, res) => {
    Donation.find()
        .then((donations) => {
            res.json(donations);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err.message });
        });
});

router.route("/update/:id").put(async (req, res) => {
    try {
        const donationId = req.params.id;
        const { donorId, donationType, donateDate, deliverType, note, donateAmount, paymentMethod, donateGoods } = req.body;

        let donationSlips = [];

        if (req.files && req.files.length > 0) { // Change: Check if files are sent
            donationSlips = req.files.map((file) => {
                return file.path;
            });
        }

        const updatedDonationData = {
            donorId,
            donationType,
            donateDate,
            deliverType,
            note,
            donateAmount,
            paymentMethod,
            donationSlips,
            donateGoods
        };

        const updatedDonation = await Donation.findByIdAndUpdate(donationId, updatedDonationData, { new: true });
        if (!updatedDonation) {
            return res.status(404).json({ error: "Donation not found" });
        }

        res.status(200).json({ status: "Donation Updated", updatedDonation });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "Error with updating data", error: error.message });
    }
});

router.route("/delete/:id").delete(async (req, res) => {
    let donationId = req.params.id;

    await Donation.findByIdAndDelete(donationId)
        .then(() => {
            res.status(200).send({ status: "Donation deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete donation", error: err.message });
        });
});

router.route("/get/:id").get(async (req, res) => {
    try {
        const { id } = req.params;
        const donation = await Donation.findById(id);
        if (!donation) {
            return res.status(404).json({ error: "Donation not found" });
        }
        res.status(200).json(donation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
