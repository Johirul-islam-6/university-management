"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const users_controller_1 = require("./users.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const users_validation_1 = require("./users.validation");
const router = express_1.default.Router();
router.post('/create-student', (0, validateRequest_1.validateRequest)(users_validation_1.UserValidation.createStudentZodSchema), users_controller_1.CreateUserController.createStudent);
router.post('/create-faculty', (0, validateRequest_1.validateRequest)(users_validation_1.UserValidation.createFacultyZodSchema), users_controller_1.CreateUserController.createFaculy);
router.post('/create-admin', (0, validateRequest_1.validateRequest)(users_validation_1.UserValidation.createAdminZodSchema), users_controller_1.CreateUserController.createAdmin);
router.get('/', users_controller_1.CreateUserController.getAllUsers);
exports.UserRoutes = router;
