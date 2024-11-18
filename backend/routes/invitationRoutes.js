const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Invitation = require('../models/Invitation');
const tpoJob = require("../models/tpoJob");
const { protect } = require('../middleware/auth');
const tpoInternship = require('../models/tpoInternship');
const tpoEvent = require('../models/tpoEvent');

const router = express.Router();


// Create an invitation and register HR if not exists
router.post('/invite', async (req, res) => {
  const { hrEmail, jobId, internshipId, eventId, tpoId } = req.body;

  try {
    let hr = await User.findOne({ email: hrEmail, role: 'HR' });
    if (!hr) {
      const tempPassword = 'temp1234';
      hr = await User.create({
        name: 'Temporary HR',
        email: hrEmail,
        password: tempPassword,
        role: 'HR',
        company: '',
      });
    }

    const invitation = await Invitation.create({
      hrEmail,
      jobId: jobId || null,
      internshipId: internshipId || null,
      eventId: eventId || null,
      status: 'Pending',
      tpoId,
    });

    // Add HR to authorizedHRs for jobs, internships, or events
    if (jobId) {
      await tpoJob.findByIdAndUpdate(jobId, {
        $addToSet: { authorizedHRs: hr._id },
      });
    } else if (internshipId) {
      await tpoInternship.findByIdAndUpdate(internshipId, {
        $addToSet: { authorizedHRs: hr._id },
      });
    } else if (eventId) {
      await tpoEvent.findByIdAndUpdate(eventId, {
        $addToSet: { authorizedHRs: hr._id },
      });
    }

    res.status(201).json({ message: 'HR invited successfully', invitation });
  } catch (error) {
    console.error('Error inviting HR:', error); // Add this for detailed logging
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
  
});


// Fetch all invitations for an HR
router.get('/invitations/:hrEmail', async (req, res) => {
  const { hrEmail } = req.params;

  try {
    const invitations = await Invitation.find({ hrEmail });
    console.log("invitations",hrEmail);
  

    res.status(200).json(invitations);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


// Accept or reject an invitation
router.put('/invitation/:id/respond', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const invitation = await Invitation.findById(id);
    if (!invitation) return res.status(404).json({ message: 'Invitation not found' });

    invitation.status = status;
    await invitation.save();

    res.status(200).json({ message: `Invitation ${status}`, invitation });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});


// Fetch jobs where HR is authorized to manage
// Fetch jobs where HR is authorized to manage
router.get('/authorized-resources', protect, async (req, res) => {
  const userId = req.user._id;

  try {
    const jobs = await tpoJob.find({ authorizedHRs: { $in: [userId] } });
    const internships = await tpoInternship.find({ authorizedHRs: { $in: [userId] } });
    const events = await tpoEvent.find({ authorizedHRs: { $in: [userId] } });
    const invitations = await Invitation.find({ hrEmail: req.user.email }); // Fetching invitations relevant to HR

    res.status(200).json({ jobs, internships, events, invitations });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});





module.exports = router;