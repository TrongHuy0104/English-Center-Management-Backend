const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');
const studentRouter = require('./routes/studentRoutes');
const feeRouter = require('./routes/feeRoutes');
const teacherRouter = require('./routes/teacherRoutes');
const salaryRouter = require('./routes/salaryRoutes');
const classRouter = require('./routes/classRoutes');
const attendanceRouter = require('./routes/attendanceRoutes');
const dashboardRouter = require('./routes/dashboardRoutes');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

// 1) MIDDLEWARES
app.use(cors(corsOptions));
app.use(cookieParser());

// Set security HTTP headers
app.use(helmet());

if (process.env.NODE_ENV === 'development') {
  // Logging
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 1000 * 1000,
  message: 'Too many requests from this IP, please try again in one hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [],
  }),
);

// Compute time execute a request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/students', studentRouter);
app.use('/api/v1/fees', feeRouter);
app.use('/api/v1/salaries', salaryRouter);
app.use('/api/v1/classes', classRouter);
app.use('/api/v1/teachers', teacherRouter);
app.use('/api/v1/attendances', attendanceRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/classes', classRouter);
app.use('/uploads', express.static('uploads'));

// HANDLING UNHANDLED ROUTES
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl}. on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
