const express = require('express');
const router = express.Router();
const { getAdminStats, getAllUsers, toggleVerifyUser, getContactMessages } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect, authorize('Admin'));

router.get('/stats', getAdminStats);
router.get('/users', getAllUsers);
router.put('/users/:id/verify', toggleVerifyUser);
router.get('/contacts', getContactMessages);

module.exports = router;
