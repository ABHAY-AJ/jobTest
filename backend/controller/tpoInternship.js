const tpoInternship = require('../models/tpoInternship');
const tpoApplication = require('../models/tpoApplication');
const User = require('../models/User');




// Create a new internship
exports.createTpoInternship = async (req, res) => {
    try {
        const internship = new tpoInternship({ ...req.body, postedBy: req.user._id });
        await internship.save();
        res.status(201).json({ success: true, data: internship });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};



// Get all internships
exports.getAllTpoInternships = async (req, res) => {
    try {
        const internships = await tpoInternship.find().populate('postedBy', 'name email');
        res.status(200).json({ success: true, data: internships });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};



// Get all internships posted by the logged-in HR
exports.getAllInternshipsByTPO = async (req, res) => {
    try {
        const tpoInternships = await tpoInternship.find({ postedBy: req.user._id }).populate('postedBy', 'name email');
        res.status(200).json({ success: true, data: tpoInternships });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};



// Get a specific internship by ID
exports.getTpoInternshipById = async (req, res) => {
    try {
        const internship = await tpoInternship.findById(req.params.id).populate('postedBy', 'name email');
        if (!internship) return res.status(404).json({ success: false, message: 'Internship not found' });
        res.status(200).json({ success: true, data: internship });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


exports.updateTpoInternship = async (req, res) => {
    try {
        const internship = await tpoInternship.findById(req.params.internshipId);
        if (!internship) return res.status(404).json({ success: false, message: 'internship not found' });

        const createdAt = new Date(internship.createdAt);
        const now = new Date();
        const timeDifference = (now - createdAt) / (1000 * 60 * 60); // Convert milliseconds to hours

        if (timeDifference > 2) {
            return res.status(403).json({ success: false, message: 'You can only update the internship within 2 hours of posting' });
        }

        const updatedInternship = await tpoInternship.findByIdAndUpdate(req.params.internshipId, req.body, { new: true });
        res.status(200).json({ success: true, data: updatedInternship });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


// Delete an internship by ID
exports.deleteTpoInternship = async (req, res) => {
    try {
        const internship = await tpoInternship.findByIdAndDelete(req.params.id);
        if (!internship) return res.status(404).json({ success: false, message: 'Internship not found' });
        res.status(200).json({ success: true, message: 'Internship deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


// Apply for internship
exports.applyForTpoInternship = async (req, res) => {
    try {
        const internshipId = req.params.id;

        // Fetch the internship document
        const internship = await tpoInternship.findById(internshipId);
        if (!internship) return res.status(404).json({ success: false, message: 'Internship not found' });

        // Fetch the user document
     
        
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ success: false, message: 'Student profile not found' });

        // Check if the student has already applied
        if (user.appliedTpoInternships.includes(internshipId)) {
            return res.status(400).json({ success: false, message: 'You have already applied for this internship' });
        }

        // Create a new application
        const application = new tpoApplication({
            student: req.user._id,
            tpoInternship: internshipId,
            score: calculateScore(internship.criteria, user.profile)
        });

        await application.save();

        // Update internship and user data
        internship.tpoApplications.push(application._id);
        await internship.save();

        user.appliedTpoInternships.push(internshipId);
        await user.save();

        res.status(201).json({ success: true, data: application });
    } catch (error) {
        console.error('Error applying for internship:', error);
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
