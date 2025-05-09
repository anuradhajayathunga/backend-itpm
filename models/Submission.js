const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  type: {
    type: String,
    // required: [true, 'Submission type is required'],
    enum: ['Complaint', 'Feedback', 'Suggestion']
  },
  userType: {
    type: String,
    // required: [true, 'User type is required'],
    enum: ['Resident', 'Collector', 'Company']
  },
  category: {
    type: String,
    // required: [true, 'Category is required'],
    enum: ['Operational', 'Technical', 'Interpersonal', 'Environmental']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    // minlength: [10, 'Description must be at least 10 characters long']
  },
  rating: {
    type: Number,
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot be more than 5'],
    default: 0
  },
  urgency: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    default: 'Low'
  },
  picture: {
    type: String, // Stores Base64 encoded image
    validate: {
      validator: function(v) {
        // Basic validation for Base64 image
        if (!v) return true; // Allow empty
        return /^data:image\/[a-z]+;base64,/i.test(v);
      },
      message: props => 'Invalid image format'
    }
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
submissionSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;