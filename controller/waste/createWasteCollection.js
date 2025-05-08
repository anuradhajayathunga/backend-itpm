const mongoose = require("mongoose");
const WasteCollection = require("../../models/wasteModel");

const createWasteCollection = async (req, res) => {
  try {
    const newRequest = new WasteCollection(req.body);
    await newRequest.save();

    res
      .status(200)
      .json({ success: true, message: "Form submitted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

module.exports = createWasteCollection;
