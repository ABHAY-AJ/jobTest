const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    criteria: {
        skills: [String],
        minExperience: Number,
        education: String,
        location: {type:String, default:"Any"},
        area: {type:String, default:"Any"},
        College:{type:[String], default:"Any"},
        dateOfBirth: { type: Date },
        academicPercentage: { type: Number },
    },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to TPO or initial HR
    authorizedHRs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // New field to store invited HRs
    applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }]
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);