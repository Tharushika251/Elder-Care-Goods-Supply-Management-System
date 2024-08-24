const express = require("express");
const router = express.Router();

//Insert Controller
const InfromController = require("../Controllers/InfromSupplyControllers");

router.get("/", InfromController.getAllInfrom);
router.post("/", InfromController.addInfrom);
router.get("/:id", InfromController.getById);
router.put("/:id", InfromController.updateInfrom);
router.delete("/:id", InfromController.deleteInfrom);

//export
module.exports = router;
