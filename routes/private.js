const express = require('express');
const router = express.Router();
const { getPrivateData } = require('../controllers/private');
const {protect}=require('../middleware/auth')

router.route('/private').get( protect, getPrivateData);

module.exports = router;
