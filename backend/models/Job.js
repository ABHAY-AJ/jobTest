const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    criteria: {
      skills: [String],
      minExperience: Number,
      education: String,
      // Additional criteria...
    },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to HR
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }]
  });
  
 
  
  module.exports = mongoose.model('Job', jobSchema)
  ;
  