const Job = require('../models/Job');
const Application = require('../models/Application');
const User = require('../models/User');

// Create a new job
exports.createJob = async (req, res) => {
    try {
        const job = new Job({ ...req.body, postedBy: req.user._id });
        await job.save();
        res.status(201).json({ success: true, data: job });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all jobs
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find().populate('postedBy', 'name email');
        res.status(200).json({ success: true, data: jobs });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all jobs posted by the logged-in HR
exports.getAllJobsByHR = async (req, res) => {
    try {
        const jobs = await Job.find({ postedBy: req.user._id }).populate('postedBy', 'name email');
        res.status(200).json({ success: true, data: jobs });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


// Get a specific job by ID
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('postedBy', 'name email');
        if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
        res.status(200).json({ success: true, data: job });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update a job by ID
exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) return res.status(404).json({ success: false, message: 'job not found' });

        const createdAt = new Date(job.createdAt);
        const now = new Date();
        const timeDifference = (now - createdAt) / (1000 * 60 * 60); // Convert milliseconds to hours

        if (timeDifference > 2) {
            return res.status(403).json({ success: false, message: 'You can only update the job within 2 hours of posting' });
        }

        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: updatedJob });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete a job by ID
exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
        res.status(200).json({ success: true, message: 'Job deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Apply for a job
exports.applyForJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
        console.log(req.user._id)
        const user = await User.findOne(req.user._id);
        // console.log(user);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Student profile not found' });
        }

        // Check if the student has already applied
        if (user.appliedJobs.includes(job._id)) {
            return res.status(400).json({ success: false, message: 'You have already applied for this job' });
        }

        const application = new Application({
            student: req.user._id,
            job: job._id,
            score: calculateScore(job.criteria, req.user.profile)
        });

        await application.save();
        job.applications.push(application._id);
        await job.save();
         // Add the job to the student's applied jobs
         user.appliedJobs.push(job._id);
         await user.save();

        res.status(201).json({ success: true, data: application });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Calculate score based on job criteria and student profile
const calculateScore = (criteria, profile) => {
    let score = 0;
    
    // Check if profile skills match criteria skills
    if (profile.skills.some(skill => criteria.skills.includes(skill))) score += 20;

    // Check if profile experience meets or exceeds criteria
    if (profile.experience >= criteria.minExperience) score += 30;

    // Check if profile education matches criteria
    if (profile.education === criteria.education) score += 10;

    // Check if profile location matches criteria or if criteria location is "Any"
    if (criteria.location === "Any" || profile.location === criteria.location) {
        score += 10; // Add location score
    }

    if (criteria.college === "Any" || profile.college === criteria.college) {
        score += 10; // Add location score
    }


    // Check if profile date of birth matches the criteria date of birth
    if (!criteria.dateOfBirth || profile.dateOfBirth <= criteria.dateOfBirth) {
        score += 10; // Add date of birth score
    }

     // Check if profile academic percentage meets or exceeds criteria
     if (!criteria.academicPercentage || profile.academicPercentage >= criteria.academicPercentage) {
        score += 20; // Add academic percentage score
    }

    return score;
};

