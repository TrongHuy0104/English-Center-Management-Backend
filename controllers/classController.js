const Teacher = require('../models/teacherModel'); // Import model Teacher
const Class = require('../models/classModel');     // Import model Class

// Hàm để lấy dữ liệu lớp dựa vào teacherId
exports.getClassData = async (req, res, next) => {
  try {
    const { teacherId } = req.params;

    // Tìm giáo viên theo teacherId và populate trường classes để lấy thông tin lớp
    const teacherData = await Teacher.findById(teacherId).populate('classes');

    // Kiểm tra xem giáo viên có tồn tại không
    if (!teacherData) {
      return res.status(404).json({
        status: 'fail',
        message: 'Teacher not found',
      });
    }

    // Gửi phản hồi với danh sách lớp của giáo viên
    res.status(200).json({
      status: 'success',
      data: {
        classes: teacherData.classes,
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