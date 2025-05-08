const mongoose = require("mongoose");
const WasteCollection = require("../../models/wasteModel");

const deleteWasteCollection = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid ID", error: true, success: false });
    }

    const deleted = await WasteCollection.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Record not found", error: true, success: false });
    }

    res
      .status(200)
      .json({ message: "Deleted successfully", success: true, error: false });
  } catch (err) {
    res.status(500).json({ message: err.message, error: true, success: false });
  }
};

module.exports = deleteWasteCollection;
