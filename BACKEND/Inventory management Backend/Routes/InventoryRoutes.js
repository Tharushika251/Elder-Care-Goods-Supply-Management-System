const express = require("express");
const router = express.Router();
//Insert Model
const Inventory = require("../Model/InventoryModel");

//Insert Controller
const InventoryController = require("../Controllers/InventoryControllers");

router.get("/", InventoryController.getAllInventory);
router.post("/", InventoryController.addInventory);
router.get("/:id", InventoryController.getById);
router.put("/:id", InventoryController.updateInventory);
router.delete("/:id", InventoryController.deleteInventory);

//export
module.exports = router;
