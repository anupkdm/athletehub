const ContactMessage = require('../models/ContactMessage');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and message' });
    }

    const contact = await ContactMessage.create({
      name,
      email,
      subject: subject || 'General Contact',
      message
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for reaching out! Our team will get back to you shortly.',
      data: contact
    });
  } catch (error) {
    next(error);
  }
};
