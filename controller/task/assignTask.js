// Fixed Task Assignment Controller
const Collector = require("../../models/collectorModel");
const Task = require("../../models/taskModel");

// Assign a task to a collector
const assignTask = async (req, res) => {
  try {
    const {
      email, // Collector's email
      title,
      description,
      uemail,
      phone,
      city,
      address,
      wasteType,
      assignedDate,
    } = req.body;

    // Find collector by email
    const collector = await Collector.findOne({ email });
    if (!collector) {
      return res.status(404).json({ message: "Collector not found" });
    }

    // Create task with all fields
    const newTask = new Task({
      title,
      description,
      uemail,
      phone,
      city,
      address,
      wasteType,
      assignedDate,
      collector: collector._id, // Link via ObjectId
      status: "pending",
    });

    await newTask.save();
    res.status(200).json({ message: "Task assigned successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = assignTask;

// API endpoint to get collector tasks
const getCollectorTasks = async (req, res) => {
  try {
    const { email } = req.params;
    
    // Find the collector by email
    const collector = await Collector.findOne({ email });
    if (!collector) {
      return res.status(404).json({ message: "Collector not found" });
    }
    
    // Find all tasks assigned to this collector
    const tasks = await Task.find({ collector: collector._id });
    
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { assignTask, getCollectorTasks };
