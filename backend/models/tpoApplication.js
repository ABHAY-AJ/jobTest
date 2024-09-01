const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    tpoJob: { type: mongoose.Schema.Types.ObjectId, ref: 'tpoJob' }, // Null if applying for an internship
    tpoInternship: { type: mongoose.Schema.Types.ObjectId, ref: 'tpoInternship' }, // Null if applying for a job
    score: { type: Number, default: 0 },
    status: { type: String, enum: ['Pending', 'Reviewed', 'Accepted', 'Rejected'], default: 'Pending' },
    date: { type: Date, default: Date.now }
  },{timestamps:true});
  
  module.exports = mongoose.model('tpoApplication', applicationSchema);
  