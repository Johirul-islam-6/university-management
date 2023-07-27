"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middlewares/validateRequest");
const auth_validataion_1 = require("./auth.validataion");
const auth_controller_1 = require("./auth.controller");
const authValidtaionRoute_1 = require("../../middlewares/authValidtaionRoute");
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/login', (0, validateRequest_1.validateRequest)(auth_validataion_1.AuthValidation.authZodSchema), auth_controller_1.AuthController.login);
router.post('/refresh-token', (0, validateRequest_1.validateRequest)(auth_validataion_1.AuthValidation.refreshtokenZodSchema), auth_controller_1.AuthController.refreshToken);
router.patch('/change-password', (0, validateRequest_1.validateRequest)(auth_validataion_1.AuthValidation.changePasswordZodSchema), (0, authValidtaionRoute_1.atuthValidationRoute)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.FACULTY, user_1.ENUM_USER_ROLE.STUDENT, user_1.ENUM_USER_ROLE.SUPER_ADMIN), auth_controller_1.AuthController.changePassword);
exports.authRoutes = router;
