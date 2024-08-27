const Internship = require('../models/Internship');
const Application = require('../models/Application');
const User = require('../models/User');

// Create a new internship
exports.createInternship = async (req, res) => {
    try {
        const internship = new Internship({ ...req.body, postedBy: req.user._id });
        await internship.save();
        res.status(201).json({ success: true, data: internship });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all internships
exports.getAllInternships = async (req, res) => {
    try {
        const internships = await Internship.find().populate('postedBy', 'name email');
        res.status(200).json({ success: true, data: internships });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get a specific internship by ID
exports.getInternshipById = async (req, res) => {
    try {
        const internship = await Internship.findById(req.params.id).populate('postedBy', 'name email');
        if (!internship) return res.status(404).json({ success: false, message: 'Internship not found' });
        res.status(200).json({ success: true, data: internship });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Update an internship by ID
exports.updateInternship = async (req, res) => {
    try {
        const internship = await Internship.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!internship) return res.status(404).json({ success: false, message: 'Internship not found' });
        res.status(200).json({ success: true, data: internship });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Delete an internship by ID
exports.deleteInternship = async (req, res) => {
    try {
        const internship = await Internship.findByIdAndDelete(req.params.id);
        if (!internship) return res.status(404).json({ success: false, message: 'Internship not found' });
        res.status(200).json({ success: true, message: 'Internship deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Apply for an internship
exports.applyForInternship = async (req, res) => {
    try {
        const internship = await Internship.findById(req.params.id);
        if (!internship) return res.status(404).json({ success: false, message: 'Internship not found' });
        const user = await User.findOne(req.user._id);
        console.log(user);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Student profile not found' });
        }
console.log(user.appliedInternships.includes(internship._id));
        // Check if the student has already applied
        if (user.appliedInternships.includes(internship._id)) {
            return res.status(400).json({ success: false, message: 'You have already applied for this internship' });
        }

        const application = new Application({
            student: req.user._id,
            internship: internship._id,
            score: calculateScore(internship.criteria, req.user.profile)
        });

        await application.save();
        internship.applications.push(application._id);
        await internship.save();

         // Add the internship to the student's applied internships
         user.appliedInternships.push(internship._id);
         await user.save();


        res.status(201).json({ success: true, data: application });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Calculate score based on internship criteria and student profile
const calculateScore = (criteria, profile) => {
    let score = 0;
    
    // Check if profile skills match criteria skills
    if (profile.skills.some(skill => criteria.skills.includes(skill))) score += 20;

    // Check if profile experience meets or exceeds criteria
    if (profile.experience >= criteria.minExperience) score += 30;

    // Check if profile education matches criteria
    if (profile.education === criteria.education) score += 30;

    // Check if profile location matches criteria or if criteria location is "Any"
    if (criteria.location === "Any" || profile.location === criteria.location) {
        score += 10; // Add location score
    }

    if (criteria.college === "Any" || profile.college === criteria.college) {
        score += 10; // Add location score
    }


    return score;
};




