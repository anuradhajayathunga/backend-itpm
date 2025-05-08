const mongoose = require("mongoose");
const WasteCollection = require("../../models/wasteModel");

const updateWasteCollectionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid ID", error: true, success: false });
    }

    if (!["Pending", "Accepted", "Rejected"].includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid status", error: true, success: false });
    }

    const updated = await WasteCollection.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

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

module.exports = updateWasteCollectionStatus;
