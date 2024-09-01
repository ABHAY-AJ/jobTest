const tpoApplication = require("../models/tpoApplication");
const tpoEvent = require("../models/tpoEvent");
const User = require("../models/User");

// Create a new job
exports.createTpoEvent = async (req, res) => {
    try {
        const event = new tpoEvent({ ...req.body, postedBy: req.user._id });
        await event.save();
        res.status(201).json({ success: true, data: event });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};



// Get all jobs
exports.getAllTpoEvent = async (req, res) => {
    try {
        const events = await tpoEvent.find().populate('postedBy', 'name email');
        res.status(200).json({ success: true, data: events });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


// Get a specific job by ID
exports.getTpoEventById = async (req, res) => {
    try {
        const event = await tpoEvent.findById(req.params.id).populate('postedBy', 'name email');
        if (!event) return res.status(404).json({ success: false, message: 'Job not found' });
        res.status(200).json({ success: true, data: event });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


// Update a job by ID
exports.updateTpoEvent = async (req, res) => {
    try {
        const event = await tpoEvent.findById(req.params.id);
        if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

        const createdAt = new Date(event.createdAt);
        const now = new Date();
        const timeDifference = (now - createdAt) / (1000 * 60 * 60); // Convert milliseconds to hours

        if (timeDifference > 2) {
            return res.status(403).json({ success: false, message: 'You can only update the event within 2 hours of posting' });
        }

        const updatedEvent = await tpoEvent.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ success: true, data: updatedEvent });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


// Delete a Event by ID
exports.deleteTpoEvent = async (req, res) => {
    try {
        const event = await tpoEvent.findByIdAndDelete(req.params.id);
        if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
        res.status(200).json({ success: true, message: 'Event deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};



// Apply for a job
exports.applyForTpoEvent = async (req, res) => {
    try {
        const event = await tpoEvent.findById(req.params.id);
        if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Student profile not found' });
        }

        // Check if the student has already applied
        if (user.appliedTpoEvents.includes(event._id)) {
            return res.status(400).json({ success: false, message: 'You have already applied for this event' });
        }

        const application = new tpoApplication({
            student: req.user._id,
            tpoEvent: event._id,
            score: calculateScore(event.criteria, req.user.profile) // Calculate score based on event criteria and user profile
        });

        await application.save();

        event.participants.push(application._id);
        await event.save();

        // Add the event to the student's applied events
        user.appliedTpoEvents.push(event._id);
        await user.save();

        res.status(201).json({ success: true, data: application });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};





// Utility function to calculate match score between criteria and user profile
function calculateScore(criteria, profile) {
    let score = 0;
    let totalCriteria = 0;

    // Check Education
    if (criteria.education) {
        totalCriteria++;
        if (profile.education === criteria.education) {
            score++;
        }
    }

    // Check Location
    if (criteria.location && criteria.location.length > 0) {
        totalCriteria++;
        if (criteria.location.includes(profile.location)) {
            score++;
        }
    }

    // Check College
    if (criteria.College) {
        totalCriteria++;
        if (profile.college === criteria.College) {
            score++;
        }
    }

    // Check Date of Birth
    if (criteria.dateOfBirth) {
        totalCriteria++;
        const userAge = new Date().getFullYear() - new Date(profile.dateOfBirth).getFullYear();
        const requiredAge = new Date().getFullYear() - new Date(criteria.dateOfBirth).getFullYear();
        if (userAge >= requiredAge) {
            score++;
        }
    }

    // Check Academic Percentage
    if (criteria.academicPercentage) {
        totalCriteria++;
        if (profile.academicPercentage >= criteria.academicPercentage) {
            score++;
        }
    }

    // Check Branch
    if (criteria.branch) {
        totalCriteria++;
        if (profile.branch === criteria.branch) {
            score++;
        }
    }

    // Calculate the final score as a percentage
    if (totalCriteria > 0) {
        return (score / totalCriteria) * 100;
    } else {
        return 0; // No criteria defined
    }
    return score;
}


