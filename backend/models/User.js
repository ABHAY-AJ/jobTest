const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['HR', 'TPO', 'Student'], required: true },
  profile: {
    skills: [String],
    experience: Number,
    education: String,
    location:String,
    College:String,
    dateOfBirth: { type: Date},
    academicPercentage: { type: Number},
    // Additional profile fields...
  },
  appliedJobs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
}],
appliedTpoJobs: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'tpoJob',
}],
appliedInternships: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Internship',
}],

appliedTpoEvent:[{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'tpoEvent',
}],
appliedTpoInternships: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'tpoInternship',
}],
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' } // For HR role
});


// Password hashing before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
