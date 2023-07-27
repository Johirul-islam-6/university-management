"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemesterRoute = void 0;
const express_1 = __importDefault(require("express"));
const academicSemester_controller_1 = require("./academicSemester.controller");
const zodAcademicSemester_validation_1 = require("./zodAcademicSemester.validation");
const validateRequest_1 = require("../../middlewares/validateRequest");
const router = express_1.default.Router();
// router.post(
//   '/create-semester',
//   validateRequest(AcademicSemesterValidation.AcademicSemesterZodSchema),
//   AcademicSemesterController.CreateAcademicSemester
// );
router.patch('/:id', (0, validateRequest_1.validateRequest)(zodAcademicSemester_validation_1.AcademicSemesterValidation.UpdateAcademicSemesterSchema), academicSemester_controller_1.AcademicSemesterController.updateSemester);
router.get('/', academicSemester_controller_1.AcademicSemesterController.getAllSemester);
router.get('/:id', academicSemester_controller_1.AcademicSemesterController.getSingelSemester);
router.delete('/:id', academicSemester_controller_1.AcademicSemesterController.DeleteSingelSemester);
exports.SemesterRoute = router;
