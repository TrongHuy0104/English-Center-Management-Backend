const Class = require('../models/classModel'); // Import model Class
const Student = require('../models/studentModel'); // Import model Student

// Hàm lấy dữ liệu học sinh trong lớp
exports.getStudentsData = async (req, res, next) => {
  try {
    const { classId } = req.params;

    // Tìm lớp theo classId và populate trường students để lấy thông tin học sinh
    const classData = await Class.findById(classId).populate('students');

    // Kiểm tra xem lớp có tồn tại không
    if (!classData) {
      return res.status(404).json({
        status: 'fail',
        message: 'Class not found',
      });
    }

    // Gửi phản hồi với danh sách học sinh
    res.status(200).json({
      status: 'success',
      data: {
        students: classData.students,
      },
    });
  } catch (error) {
    // Xử lý lỗi
    res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

// // Hàm lấy dữ liệu các lớp học theo teacherId
// exports.getClassData = async (req, res, next) => {
//   try {
//     const { teacherId } = req.params;

//     // Tìm giáo viên theo teacherId và populate thông tin lớp học
//     const teacherData = await Teacher.findById(teacherId).populate('classes');

//     // Kiểm tra nếu giáo viên không tồn tại
//     if (!teacherData) {
//       return res.status(404).json({
//         status: 'fail',
//         message: 'Teacher not found',
//       });
//     }

//     // Lấy thông tin các lớp mà giáo viên này dạy
//     const classes = teacherData.classes;

//     // Gửi phản hồi với danh sách các lớp học
//     res.status(200).json({
//       status: 'success',
//       data: {
//         classes,
//       },
//     });
//   } catch (error) {
//     // Xử lý lỗi
//     res.status(500).json({
//       status: 'error',
//       message: error.message,
//     });
//   }
// };