'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.academicDepartmentRoutes = void 0;
const express_1 = __importDefault(require('express'));
const academicDepartment_controller_1 = require('./academicDepartment.controller');
const academicDepartment_validations_1 = require('./academicDepartment.validations');
const validateRequest_1 = require('../../middlewares/validateRequest');
const router = express_1.default.Router();
router.post(
  '/create-department',
  (0, validateRequest_1.validateRequest)(
    academicDepartment_validations_1.AcademicDepartmentValidation
      .createAcademicDepartmentZodSchema
  ),
  academicDepartment_controller_1.AcademicDepartmentController.createDepartment
);
router.get(
  '/:id',
  academicDepartment_controller_1.AcademicDepartmentController
    .getSingleDepartment
);
router.patch(
  '/:id',
  (0, validateRequest_1.validateRequest)(
    academicDepartment_validations_1.AcademicDepartmentValidation
      .updateAcademicDepartmentZodSchema
  ),
  academicDepartment_controller_1.AcademicDepartmentController.updateDepartment
);
router.delete(
  '/:id',
  academicDepartment_controller_1.AcademicDepartmentController.deleteDepartment
);
router.get(
  '/',
  academicDepartment_controller_1.AcademicDepartmentController.getAllDepartments
);
exports.academicDepartmentRoutes = router;
