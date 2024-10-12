const express = require('express');
const teacherController = require('../controllers/teacherController');
const authController = require('../controllers/authController');

const router = express.Router();

// Protect all routes after this middleware
router.use(authController.protect);

// Define the route to get students taught by the teacher
router.get('/students', teacherController.getStudents);

module.exports = router;
