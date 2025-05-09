const Submission = require('../../models/Submission'); // ✅ correct path
exports.createSubmission = async (req, res) => {
  try {
    // Input validation
    if (!req.body.type || !req.body.userType || !req.body.category || !req.body.description) {
      return res.status(400).json({ 
        success: false,
        message: "Missing required fields: type, userType, category, and description are required" 
      });
    }

    // Prepare submission data
    const submissionData = {
      type: req.body.type,
      userType: req.body.userType,
      category: req.body.category,
      description: req.body.description,
      rating: req.body.rating || 0,
      urgency: req.body.urgency || 'Low',
    };

    // Only add picture if it exists and is not empty
    if (req.body.picture && req.body.picture.trim() !== '') {
      // Validate that the picture is a valid Base64 string
      // Base64 validation - optional but recommended
      const base64Regex = /^data:image\/[a-z]+;base64,/i;
      if (base64Regex.test(req.body.picture)) {
        submissionData.picture = req.body.picture;
      } else {
        console.warn("Invalid image format received");
        // You can choose to reject or just ignore the invalid image
        // return res.status(400).json({ success: false, message: "Invalid image format" });
      }
    }

    // Create and save the submission
    const Submission = require('../../models/Submission'); // Make sure to import your model
    const submission = new Submission(submissionData);
    const savedSubmission = await submission.save();

    // Respond with success
    res.status(201).json({
      success: true,
      message: "Submission created successfully",
      data: savedSubmission
    });
  } catch (error) {
    console.error("Error creating submission:", error);
    
    // MongoDB validation errors handling
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        success: false,
        message: "Validation error",
        errors: validationErrors
      });
    }
    
    // General error response
    res.status(500).json({ 
      success: false,
      message: "Failed to create submission",
      error: error.message 
    });
  }
};

exports.getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.json(submissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    
    submission.status = req.body.status || submission.status;
    const updatedSubmission = await submission.save();
    res.json(updatedSubmission);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSubmission = async (req, res) => {
  try {
    const submission = await Submission.findByIdAndDelete(req.params.id);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json({ message: 'Submission deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};