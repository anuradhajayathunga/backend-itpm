const WasteCollection = require("../../models/wasteModel");

const getAllWasteCollections = async (req, res) => {
  try {
    const records = await WasteCollection.find().sort({ createdAt: 1 });
    res.status(200).json({ data: records, success: true, error: false });
  } catch (err) {
    res.status(500).json({ message: err.message, error: true, success: false });
  }
};

module.exports = getAllWasteCollections;
