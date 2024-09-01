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
        const internship = await Internship.findById(req.params.id);
        if (!job) return res.status(404).json({ success: false, message: 'internship not found' });

        const createdAt = new Date(internship.createdAt);
        const now = new Date();
        const timeDifference = (now - createdAt) / (1000 * 60 * 60); // Convert milliseconds to hours

        if (timeDifference > 2) {
            return res.status(403).json({ success: false, message: 'You can only update the internship within 2 hours of posting' });
        }

        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: Job });
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
    if (profile.experience >= criteria.minExperience) score += 20;

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




