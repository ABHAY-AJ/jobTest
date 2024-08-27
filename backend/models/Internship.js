const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    criteria: {
      skills: [String],
      minExperience: Number,
      education: String,
      // Additional criteria...
    },
    duration: {
      type: String,
      required:true
    }
    ,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to HR
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }]
  });

  module.exports = mongoose.model('Internship', internshipSchema);