const router = require("express").Router();
let Salary = require("../modles/Salary");

router.route("/addsal").post((req, res) => {

    console.log(req.body);

    const { id, name, date, basic, othrs, otrate, bonus, totalSalary } = req.body;

    const newSalary = new Salary({
        id,
        name,
        date,
        basic,
        othrs,
        otrate,
        bonus,
        totalSalary

    });



    newSalary.save().then(() => {
        res.json("Salary Added")
    }).catch((err) => {
        console.log(err);
    })
})

router.route("/allsal").get((req, res) => {

    Salary.find().then((salarys) => {
        res.json(salarys)
    }).catch((err) => {
        console.log(err)
    })
})

router.get('/salary_count', async (req, res) => {
    try {

        const totalSalaryAggregate = await Salary.aggregate([
            {
                $group: {
                    _id: null,
                    totalSalary: { $sum: "$totalSalary" }
                }
            }
        ]);


        const salaryTotal = totalSalaryAggregate.length > 0 ? totalSalaryAggregate[0].totalSalary : 0;


        return res.json({ status: true, result: { salaryTotal } });
    } catch (error) {
        console.error('Error fetching salary count:', error);

        return res.status(500).json({ status: false, error: 'Failed to fetch salary count' });
    }
});

module.exports = router;