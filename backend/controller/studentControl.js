const Job = require('../models/Job');
const Internship = require('../models/Internship');
const User = require('../models/User');
const tpoApplication = require('../models/tpoApplication');
const Application = require('../models/Application');


// Get applied jobs and internships
exports.getAppliedJobsAndInternships = async (req, res) => {
    try {
        const user = await User.findOne(req.user._id)
            .populate('appliedJobs')
            .populate('appliedTpoJobs')
            .populate('appliedInternships')
            .populate('appliedTpoInternships');

        if (!user) {
            return res.status(404).json({ success: false, message: 'Student profile not found' });
        }

        res.status(200).json({
            success: true,
            appliedJobs: user.appliedJobs,
            appliedInternships: user.appliedInternships,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Applications for the Logged-in Student
exports.getStudentApplications = async (req, res) => {
    try {
        const studentId = req.user._id;

        // Find applications made by this student
        const applications = await Application.find({ student: studentId })
            .populate('_id')
            .exec();

        res.status(200).json({ applications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get tpoApplications for the Logged-in Student
exports.getStudentTpoApplications = async (req, res) => {
    try {
        const studentId = req.user._id;

        // Find applications made by this student
        const tpoApplications = await tpoApplication.find({ student: studentId })
            .populate('_id')
            .exec();

        res.status(200).json({ tpoApplications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};