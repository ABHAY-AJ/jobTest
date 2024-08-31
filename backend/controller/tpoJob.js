const tpoJob = require('../models/tpoJob');
const tpoApplication = require('../models/tpoApplication');
const User = require('../models/User');


// Create a new job
exports.createTpoJob = async (req, res) => {
    try {
        const job = new tpoJob({ ...req.body, postedBy: req.user._id });
        await job.save();
        res.status(201).json({ success: true, data: job });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


// Get all jobs
exports.getAllTpoJobs = async (req, res) => {
    try {
        const jobs = await tpoJob.find().populate('postedBy', 'name email');
        res.status(200).json({ success: true, data: jobs });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


// Get a specific job by ID
exports.getTpoJobById = async (req, res) => {
    try {
        const job = await tpoJob.findById(req.params.id).populate('postedBy', 'name email');
        if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
        res.status(200).json({ success: true, data: job });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


// Update a job by ID
exports.updateTpoJob = async (req, res) => {
    try {
        const job = await tpoJob.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
        res.status(200).json({ success: true, data: job });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


// Delete a job by ID
exports.deleteTpoJob = async (req, res) => {
    try {
        const job = await tpoJob.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
        res.status(200).json({ success: true, message: 'Job deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


// Apply for a job
exports.applyForTpoJob = async (req, res) => {
    try {
        const job = await tpoJob.findById(req.params.jobId);
        if (!job) return res.status(404).json({ success: false, message: 'Job not found' });
        console.log(req.user._id)
        const user = await User.findOne(req.user._id);
        // console.log(user);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Student profile not found' });
        }

        // Check if the student has already applied
        if (user.appliedTpoJobs.includes(tpoJob._id)) {
            return res.status(400).json({ success: false, message: 'You have already applied for this job' });
        }

        const application = new tpoApplication({
            student: req.user._id,
            tpoJob: tpoJob._id,
            score: calculateScore(tpoJob.criteria, req.user.profile)
        });

        await application.save();
        job.tpoApplications.push(application._id);
        await job.save();
         // Add the job to the student's applied jobs
         user.appliedTpoJobs.push(tpoJob._id);
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
        score += 5; // Add location score
    }

    if (criteria.branch === "Any" || profile.branch === criteria.branch) {
        score += 5; // Add location score
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