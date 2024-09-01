const tpoApplication = require('../models/tpoApplication');

exports.getTpoApplications = async (req, res) => {
    try {
        const applications = await tpoApplication.find({ tpoEvent: req.params.id })
            .populate('student', 'name email profile');
        res.status(200).json({ success: true, data: applications });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.filterTpoApplications = async (req, res) => {
    try {
        const applications = await tpoApplication.find({ 
            $and: [
                { tpoEvent: req.params.id },
                { score: { $gte: req.query.minScore || 60 } }
            ]
        }).populate('student', 'name email profile');
        res.status(200).json({ success: true, data: applications });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
exports.reviewTpoApplication = async (req, res) => {
    try {
        const application = await tpoApplication.findByIdAndUpdate(req.params.applicationId, req.body, { new: true });
        if (!application) return res.status(404).json({ success: false, message: 'Application not found' });
        res.status(200).json({ success: true, data: application });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
