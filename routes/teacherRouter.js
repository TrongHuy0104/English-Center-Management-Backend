const express = require('express');
const teacherController = require('../controllers/teacherController');

const router = express.Router();

// Route để lấy dữ liệu học sinh trong lớp
router.get('/:classId/students', teacherController.getStudentsData);


module.exports = router;
