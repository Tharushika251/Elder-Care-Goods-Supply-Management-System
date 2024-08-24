const Infrom = require("../Model/InfromSupplyModel");

const getAllInfrom = async (req, res, next) => {
  let infrosup;
  // Get all Infrom
  try {
    infrosup = await Infrom.find();
  } catch (err) {
    console.log(err);
  }
  // not found
  if (!infrosup) {
    return res.status(404).json({ message: "Infrom not found" });
  }
  // Display all infrosup
  return res.status(200).json({ infrosup });
};

// data Insert
const addInfrom = async (req, res, next) => {
  const { product, description, amount,productid } = req.body;

  let infrosup;

  try {
    infrosup = new Infrom({
      product,
      description,
      amount,
      productid,
    });
    await infrosup.save();
  } catch (err) {
    console.log(err);
  }
  // not insert infrosups
  if (!infrosup) {
    return res.status(404).json({ message: "unable to add Infrom" });
  }
  return res.status(200).json({ infrosup });
};

//Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;

  let infrosup;

  try {
    infrosup = await Infrom.findById(id);
  } catch (err) {
    console.log(err);
  }
  // not available infrosups
  if (!infrosup) {
    return res.status(404).json({ message: "Infrom Not Found" });
  }
  return res.status(200).json({ infrosup });
};

//Update infrosup Details
const updateInfrom = async (req, res, next) => {
  const id = req.params.id;
  const { product, description, amount,productid } = req.body;

  let infrosups;

  try {
    infrosups = await Infrom.findByIdAndUpdate(id, {
      product: product,
      description: description,
      amount: amount,
      productid:productid,
    });
    infrosups = await infrosups.save();
  } catch (err) {
    console.log(err);
  }
  if (!infrosups) {
    return res.status(404).json({ message: "Unable to Update Infrom Details" });
  }
  return res.status(200).json({ infrosups });
};

//Delete infrosup Details
const deleteInfrom = async (req, res, next) => {
  const id = req.params.id;

  let infrosup;

  try {
    infrosup = await Infrom.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!infrosup) {
    return res.status(404).json({ message: "Unable to Delete Infrom Details" });
  }
  return res.status(200).json({ infrosup });
};

exports.getAllInfrom = getAllInfrom;
exports.addInfrom = addInfrom;
exports.getById = getById;
exports.updateInfrom = updateInfrom;
exports.deleteInfrom = deleteInfrom;
