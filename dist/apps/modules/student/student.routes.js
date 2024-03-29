'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require('express'));
const student_controller_1 = require('./student.controller');
const student_validation_1 = require('./student.validation');
const validateRequest_1 = require('../../middlewares/validateRequest');
const router = express_1.default.Router();
router.get('/', student_controller_1.CreateStudentController.getAllStudent);
router.get(
  '/:id',
  student_controller_1.CreateStudentController.getSingelStudent
);
router.delete(
  '/:id',
  student_controller_1.CreateStudentController.deleteSingelStudent
);
router.patch(
  '/:id',
  (0, validateRequest_1.validateRequest)(
    student_validation_1.StudentValidation.UpdateStudentZodSchema
  ),
  student_controller_1.CreateStudentController.updateStudent
);
exports.StudentRoutes = router;
