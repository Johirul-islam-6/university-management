"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicFacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const academicFaculty_controller_1 = require("./academicFaculty.controller");
const academicFaculty_validations_1 = require("./academicFaculty.validations");
const validateRequest_1 = require("../../middlewares/validateRequest");
const authValidtaionRoute_1 = require("../../middlewares/authValidtaionRoute");
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/create-faculty', (0, validateRequest_1.validateRequest)(academicFaculty_validations_1.AcademicFacultyValidation.createFacultyZodSchema), (0, authValidtaionRoute_1.atuthValidationRoute)(user_1.ENUM_USER_ROLE.ADMIN), academicFaculty_controller_1.AcademicFacultyController.createFaculty);
router.get('/:id', (0, authValidtaionRoute_1.atuthValidationRoute)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.FACULTY, user_1.ENUM_USER_ROLE.STUDENT, user_1.ENUM_USER_ROLE.SUPER_ADMIN), academicFaculty_controller_1.AcademicFacultyController.getSingleFaculty);
router.patch('/:id', (0, validateRequest_1.validateRequest)(academicFaculty_validations_1.AcademicFacultyValidation.updatefacultyZodSchema), (0, authValidtaionRoute_1.atuthValidationRoute)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.FACULTY, user_1.ENUM_USER_ROLE.SUPER_ADMIN), academicFaculty_controller_1.AcademicFacultyController.updateFaculty);
router.delete('/:id', (0, authValidtaionRoute_1.atuthValidationRoute)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), academicFaculty_controller_1.AcademicFacultyController.deleteFaculty);
router.get('/', (0, authValidtaionRoute_1.atuthValidationRoute)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.FACULTY, user_1.ENUM_USER_ROLE.STUDENT, user_1.ENUM_USER_ROLE.SUPER_ADMIN), academicFaculty_controller_1.AcademicFacultyController.getAllFaculties);
exports.AcademicFacultyRoutes = router;
