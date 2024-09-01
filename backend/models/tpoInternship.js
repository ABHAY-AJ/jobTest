const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    duration:Number,
    criteria: {
      skills: [String],
      minExperience: Number,
      education: String,
      location: {type:String, default:"Any"},
      College:{type:[String], default:"Any"},
      dateOfBirth: { type: Date },
      academicPercentage: { type: Number },
      cgp:Number,
      // Additional criteria...
    },
    duration: {
      type: String,
      required:true
    }
    ,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to HR
    tpoApplications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tpoApplication' }]
  }, { timestamps: true });

  module.exports = mongoose.model('tpoInternship', internshipSchema);