// taskModel.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    assignedDate: {
      type: Date,
      // required: true,
    },
    uemail: {
      type: String,
      // required: true,
    },
    phone: {
      type: String,
    },
    city: {
      type: String,
      // required: true,
    },
    address: {
      type: String,
      // required: true,
    },
    wasteType: {
      type: [String], // array of waste types selected via checkbox
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    collector: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "collector", // Fixed: Changed from "collectors" to "collector" to match the model name
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task; // Added module export for Task model
