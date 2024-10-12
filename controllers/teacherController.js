const catchAsync = require('../utils/catchAsync');
const Class = require('../models/classModel');
const Student = require('../models/studentModel');
const AppError = require('../utils/appError');

// Get students in classes taught by the teacher
exports.getStudents = catchAsync(async (req, res, next) => {
  // 1. Find the classes taught by the teacher
  const classes = await Class.find({ teacher: req.user.role_id });

  // Check if the teacher has any classes
  if (!classes.length) {
    return next(new AppError('This teacher is not assigned to any classes.', 404));
  }

  // 2. Get the students in those classes
  const studentIds = classes.flatMap((classItem) => classItem.students);

  // 3. Find the students by IDs
  const students = await Student.find({ _id: { $in: studentIds } });

  // 4. Send response
  res.status(200).json({
    status: 'success',
    results: students.length,
    data: {
      students,
    },
  });
});

// Get classes taught by the teacher
exports.getClassesByTeacher = catchAsync(async (req, res, next) => {
  // Get the teacher ID from the logged-in user
  const teacherId = req.user.role_id; // or req.user._id depending on your setup
  console.log('Teacher ID:', teacherId); // Debugging line

  // Find classes taught by the teacher
  const classes = await Class.find({ teacher: teacherId });
  console.log('Classes found:', classes); // Debugging line

  // If no classes found
  if (!classes.length) {
    return next(new AppError('No classes found for this teacher.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      classes,
    },
  });
});
