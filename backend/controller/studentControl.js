const Job = require('../models/Job');
const Internship = require('../models/Internship');
const User = require('../models/User');
const tpoApplication = require('../models/tpoApplication');


// Apply for a job
// exports.applyForJob = async (req, res) => {
//     try {
//         const job = await Job.findById(req.params.jobId);
//         if (!job) {
//             return res.status(404).json({ success: false, message: 'Job not found' });
//         }

//         const user = await Student.findOne({ user: req.user._id });
//         if (!user) {
//             return res.status(404).json({ success: false, message: 'Student profile not found' });
//         }

//         // Match the student's profile against the job criteria
//         const score = matchCriteria(user, job.criteria);

//         // Add student to the list of candidates
//         job.candidates.push({
//             user: user._id,
//             score,
//         });

//         await job.save();

//         res.status(200).json({
//             success: true,
//             message: 'Job application successful',
//             score,
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };


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
        const applications = await tpoApplication.find({ student: studentId })
            .populate('tpoJob')
            .populate('tpoInternship')
            .exec();

        res.status(200).json({ applications });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Function to match student profile against job criteria and return a score
const matchCriteria = (user, criteria) => {
    let score = 0;

    // Example matching logic:
    if (criteria.skills.every(skill => user.skills.includes(skill))) {
        score += 30; // Matching skills
    }

    if (user.experience >= criteria.experience) {
        score += 20; // Matching experience
    }

    // More matching logic based on education, projects, etc.
    // For example:
    if (user.education === criteria.education) {
        score += 10; // Matching education
    }

    // Custom logic for other fields can be added here

    return score; // Return the total score
};




// Apply for an internship
// exports.applyForInternship = async (req, res) => {
//     try {
//         const internship = await Internship.findById(req.params.internshipId);
//         if (!internship) {
//             return res.status(404).json({ success: false, message: 'Internship not found' });
//         }

//         const user = await Student.findOne({ user: req.user._id });
//         if (!user) {
//             return res.status(404).json({ success: false, message: 'Student profile not found' });
//         }

//         // Match the student's profile against the internship criteria
//         const score = matchCriteria(user, internship.criteria);

//         // Add student to the list of candidates
//         internship.candidates.push({
//             user: user._id,
//             score,
//         });

//         await internship.save();

//         res.status(200).json({
//             success: true,
//             message: 'Internship application successful',
//             score,
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };
