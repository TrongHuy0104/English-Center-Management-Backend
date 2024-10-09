// const express = require('express');
// const classController = require('../controllers/classController');

// const router = express.Router();

// // Route để lấy thông tin các lớp học của giáo viên
// router.get('/:teacherId/classes', teacherController.getClassData);

// module.exports = router;

const express = require('express');
const classController = require('../controllers/classController');

const router = express.Router();

// Route để lấy dữ liệu các lớp của giáo viên
router.get('/:teacherId/classes', classController.getClassData);

module.exports = router;
