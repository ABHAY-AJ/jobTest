const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    criteria: {
        education: String,
      location: {type:[String], 
        default:"Any"},
    //   College:{type:String, default:"Any"},
      dateOfBirth: { type: Date },
      academicPercentage: { type: Number },
      branch:String,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    college: {
        type: String,
        required: true,//for tpo
    },
    selectedColleges: [{
        type: String,default:"Any"
    }],
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    status: {
        type: String,
        enum: ['Open', 'Closed'],
        default: 'Open',
    },
    authorizedHRs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);