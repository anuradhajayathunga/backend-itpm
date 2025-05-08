const mongoose = require("mongoose");
const WasteCollection = require("../../models/wasteModel");

const updateWasteCollection = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid ID", error: true, success: false });
    }

    const updated = await WasteCollection.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Record not found", error: true, success: false });
    }

    res.status(200).json({ data: updated, success: true, error: false });
  } catch (err) {
    res.status(500).json({ message: err.message, error: true, success: false });
  }
};

module.exports = updateWasteCollection;
