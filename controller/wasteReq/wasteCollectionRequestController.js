const mongoose = require("mongoose");
const WasteCollection = require("../../models/wasteCollectionRequstModel");

// Create a new waste collection record
async function CreateWasteCollectionController(req, res) {
    try {
        const { name, email, phone, address, city, date, time, wasteType } = req.body;

        if (!name || !email || !phone || !address || !city || !date || !time || !wasteType) {
            return res.status(400).json({ message: "Please fill all the fields", error: true, success: false });
        }

        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        const phoneRegex = /^[0-9]{10}$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format", error: true, success: false });
        }

        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ message: "Invalid phone number format", error: true, success: false });
        }

        const newRecord = new WasteCollection(req.body);
        const saved = await newRecord.save();

        res.status(201).json({ message: "Request submitted successfully!", error: false, success: true, data: saved });
    } catch (err) {
        res.status(500).json({ message: err.message || err, error: true, success: false });
    }
}

// Get all waste collection records
async function GetAllWasteCollectionsController(req, res) {
    try {
        const records = await WasteCollection.find().sort({ createdAt: 1 });
        res.status(200).json({ data: records, success: true, error: false });
    } catch (err) {
        res.status(500).json({ message: err.message || err, error: true, success: false });
    }
}

// Get all waste collection records by user (email)
async function GetUserWasteCollectionsController(req, res) {
    try {
        const { email } = req.query;

        if (!email) {
            return res.status(400).json({ message: "Email is required", error: true, success: false });
        }

        const records = await WasteCollection.find({ email }).sort({ createdAt: -1 });
        res.status(200).json({ data: records, success: true, error: false });
    } catch (err) {
        res.status(500).json({ message: err.message || err, error: true, success: false });
    }
}

// Get a single waste collection record
async function GetWasteCollectionByIdController(req, res) {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID", error: true, success: false });
        }

        const record = await WasteCollection.findById(id);

        if (!record) {
            return res.status(404).json({ message: "Record not found", error: true, success: false });
        }

        res.status(200).json({ data: record, success: true, error: false });
    } catch (err) {
        res.status(500).json({ message: err.message || err, error: true, success: false });
    }
}

// Update a waste collection record
async function UpdateWasteCollectionController(req, res) {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID", error: true, success: false });
        }

        const updated = await WasteCollection.findByIdAndUpdate(id, req.body, { new: true });

        if (!updated) {
            return res.status(404).json({ message: "Record not found", error: true, success: false });
        }

        res.status(200).json({ data: updated, success: true, error: false });
    } catch (err) {
        res.status(500).json({ message: err.message || err, error: true, success: false });
    }
}

// Update only the status of a record
async function UpdateWasteCollectionStatusController(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID", error: true, success: false });
        }

        if (!["Pending", "Accepted", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status", error: true, success: false });
        }

        const updated = await WasteCollection.findByIdAndUpdate(id, { status }, { new: true });

        if (!updated) {
            return res.status(404).json({ message: "Record not found", error: true, success: false });
        }

        res.status(200).json({ data: updated, success: true, error: false });
    } catch (err) {
        res.status(500).json({ message: err.message || err, error: true, success: false });
    }
}

// Delete a waste collection record
async function DeleteWasteCollectionController(req, res) {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID", error: true, success: false });
        }

        const deleted = await WasteCollection.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "Record not found", error: true, success: false });
        }

        res.status(200).json({ message: "Deleted successfully", success: true, error: false });
    } catch (err) {
        res.status(500).json({ message: err.message || err, error: true, success: false });
    }
}

module.exports = {
    CreateWasteCollectionController,
    GetAllWasteCollectionsController,
    GetUserWasteCollectionsController,
    GetWasteCollectionByIdController,
    UpdateWasteCollectionController,
    UpdateWasteCollectionStatusController,
    DeleteWasteCollectionController,
};
