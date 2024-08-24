const router = require("express").Router();
let Staff = require("../modles/Staff");
const multer = require("multer")
const path = require("path")
const { body, validationResult } = require('express-validator');



//image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
       cb(null, 'Public/Images') 
    },
    filename: (req, file, cb) => {
        //cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
        const uniqueSuffix= Date.now();
        cb(null,uniqueSuffix+file.originalname)
    }
})
const upload = multer({
    storage: storage
})

//end image upload







router.route("/add").post(upload.single('photo'), 
[
    // Validate name
    body('name').notEmpty().withMessage('Name is required'),

    // Validate age
    body('age').notEmpty().withMessage('Age is required').isNumeric().withMessage('Age must be a number'),

    // Validate dob
    body('dob').notEmpty().withMessage('Date of Birth is required'),

    // Validate gender
    body('gender').notEmpty().withMessage('Gender is required'),

    // Validate email
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),

    // Validate password
    body('password').notEmpty().withMessage('Password is required'),

    // Validate address
    body('address').notEmpty().withMessage('Address is required'),

    // Validate contactno
    body('contactno').notEmpty().withMessage('Contact number is required').isMobilePhone().withMessage('Invalid contact number format'),

    // Validate NIC
    body('NIC').notEmpty().withMessage('NIC is required'),

    // Validate type
    body('type').notEmpty().withMessage('Type is required'),

    // Validate workexperience
    body('workexperience').notEmpty().withMessage('Work experience is required'),

    // Validate qualification
    body('qulification').notEmpty().withMessage('Qualification is required'),

    // Check if photo is uploaded
    body('photo').custom((value, { req }) => {
        if (!req.file) {
            throw new Error('Photo is required');
        }
        return true;
    })
], 


(req, res)=>{

    console.log(req.body);

    const { name, age, dob, gender, email, password, address, contactno, NIC, type, workexperience, qulification } = req.body;
    const photo =  req.file.filename; 



    const newStaff = new Staff({
        name,
        age,
        dob,
        gender,
        email,
        password,
        address,
        contactno,
        NIC,
        type,
        workexperience,
        qulification,
        photo
    });

    

    newStaff.save().then(()=>{
        res.json("Staff Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/all").get((req,res)=>{

    Staff.find().then((staffs)=>{
        res.json(staffs)
    }).catch((err)=>{
        console.log(err)
    })
})

router.route("/update/:id").put(async (req,res)=>{
    let id = req.params.id;
    const {name, age,dob, gender, email,address,contactno,NIC,type,workexperience,qulification } = req.body;

    const updateStaff = {
        name,
        age,
        dob,
        gender,
        email,
        address,
        contactno,
        NIC,
        type,
        workexperience,
        qulification
        
    }

    const update = await Staff.findByIdAndUpdate(id,updateStaff )
    .then(()=>{
        res.status(200).send({status: "Details updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data",error: err.message});
    })
})

router.route("/delete/:id").delete(async (req,res)=>{
    let id = req.params.id;

    await Staff.findByIdAndDelete(id).then(()=>{
        res.status(200).send({status: "User deleted"})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with deleting data",error: err.message});
    })
})

// Route to get staff by ID
router.get("/get/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const staff = await Staff.findById(id);
        if (!staff) {
            return res.status(404).json({ status: "Staff not found" });
        }
        return res.status(200).json({ status: "User fetched", staff });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ status: "Error with get user", error: err.message });
    }
});

router.get('/staff_count', async (req, res) => {
    try {
        const staffCount = await Staff.countDocuments();
        return res.json({ status: true, result: { staff: staffCount } });
    } catch (error) {
        console.error('Error fetching admin count:', error);
        return res.json({ status: false, error: 'Failed to fetch admin count' });
    }
});

module.exports = router;
