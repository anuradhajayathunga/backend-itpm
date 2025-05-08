const WasteCollection = require("../../models/wasteModel");

const getUserWasteCollections = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res
        .status(400)
        .json({ message: "Email is required", error: true, success: false });
    }

    const records = await WasteCollection.find({ email }).sort({
      createdAt: -1,
    });
    res.status(200).json({ data: records, success: true, error: false });
  } catch (err) {
    res.status(500).json({ message: err.message, error: true, success: false });
  }
};

module.exports = getUserWasteCollections;
