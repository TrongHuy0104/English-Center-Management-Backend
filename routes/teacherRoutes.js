// routes/feeRoutes.js
const express = require('express');
const teacherController = require('../controllers/teacherController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(teacherController.getAllTeachers)
  .post(authController.restrictTo('admin'), teacherController.createTeacher);

router
  .route('/:id')
  .get(teacherController.getTeacher)
  .patch(teacherController.updateTeacher)
  .delete(teacherController.deleteTeacher);
module.exports = router;
