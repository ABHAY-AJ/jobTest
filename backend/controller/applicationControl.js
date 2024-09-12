const Application = require('../models/Application');

// Get all applications for a specific job or internship
exports.getApplications = async (req, res) => {
    try {
        const applications = await Application.find({ 
            $or: [
                { job: req.params.id },
                { internship: req.params.id }
            ]
        }).populate('student', 'name email profile');
        res.status(200).json({ success: true, data: applications });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Filter applications based on score (e.g., score >= 60)
exports.filterApplications = async (req, res) => {
    try {
        const applications = await Application.find({ 
            $and: [
                { $or: [{ job: req.params.id }, { internship: req.params.id }] },
                { score: { $gte: req.query.minScore || 60 } }
            ]
        }).populate('student', 'name email profile');
        res.status(200).json({ success: true, data: applications });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Review an application (e.g., update status)
exports.reviewApplication = async (req, res) => {
    try {

        console.log(req.params.applicationId)
        const application = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // console.log(application);
        if (!application) return res.status(404).json({ success: false, message: 'Application not found' });
        res.status(200).json({ success: true, data: application });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};



// controllers/applicationController.js

exports.getApplicationsForJob = async (req, res) => {
    try {
      const { jobId } = req.params;
      const { minScore, experience, marks } = req.query;
  
      // Build a query object based on filters
      let query = { job: jobId };
  
      if (minScore) {
        query.score = { $gte: minScore };
      }
      if (experience) {
        query['candidateProfile.experience'] = { $gte: experience };
      }
      if (marks) {
        query['candidateProfile.marks'] = { $gte: marks };
      }
  
      // Populate candidate details
      const applications = await Application.find(query)
        .populate('student', 'name email profile')
        .exec();
  
      res.status(200).json({ success: true, data: applications });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
