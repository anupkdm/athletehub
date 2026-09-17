const Message = require('../models/Message');
const User = require('../models/User');

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
exports.sendMessage = async (req, res, next) => {
  try {
    const { recipientId, subject, content } = req.body;

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ success: false, message: 'Recipient not found' });
    }

    const message = await Message.create({
      sender: req.user.id,
      recipient: recipientId,
      subject: subject || 'Talent Inquiry',
      content
    });

    res.status(201).json({
      success: true,
      data: message
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user messages (inbox & sent)
// @route   GET /api/messages
// @access  Private
exports.getMessages = async (req, res, next) => {
  try {
    const inbox = await Message.find({ recipient: req.user.id })
      .populate('sender', 'name email avatar role')
      .sort({ createdAt: -1 });

    const sent = await Message.find({ sender: req.user.id })
      .populate('recipient', 'name email avatar role')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      inbox,
      sent
    });
  } catch (error) {
    next(error);
  }
};
