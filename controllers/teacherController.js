const catchAsync = require('../utils/catchAsync');
const Class = require('../models/classModel');
const Student = require('../models/studentModel');

exports.getStudents = catchAsync(async (req, res, next) => {
  // Find the classes taught by the teacher
  const classes = await Class.find({ teacher: req.user.role_id });

  // Get the students in those classes
  const studentIds = classes.flatMap((classItem) => classItem.students);
  const students = await Student.find({ _id: { $in: studentIds } });

  res.status(200).json({
    status: 'success',
    results: students.length,
    data: {
      students,
    },
  });
});
