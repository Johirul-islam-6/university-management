"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAdminId = exports.findLastAdminId = exports.generateFacultyId = exports.findLastFacultyId = exports.generateStudentId = exports.findLastStudentId = void 0;
const users_model_1 = require("./users.model");
// find database last student Id serial
const findLastStudentId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastUser = yield users_model_1.User.findOne({ role: 'student' }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastUser === null || lastUser === void 0 ? void 0 : lastUser.id) ? lastUser.id.substring(4) : undefined;
});
exports.findLastStudentId = findLastStudentId;
// create a student serial Id number generate
const generateStudentId = (AcademicSemester) => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastStudentId)()) || (0).toString().padStart(5, '0'); // 00000
    //incementUserId
    let incementuserId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incementuserId = `${AcademicSemester === null || AcademicSemester === void 0 ? void 0 : AcademicSemester.year.substring(2)}${AcademicSemester === null || AcademicSemester === void 0 ? void 0 : AcademicSemester.code}${incementuserId}`;
    return incementuserId;
});
exports.generateStudentId = generateStudentId;
// faculty utility
const findLastFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastFaculty = yield users_model_1.User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id) ? lastFaculty.id.substring(2) : undefined;
});
exports.findLastFacultyId = findLastFacultyId;
// create a Faculty serial Id number generate
const generateFacultyId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastFacultyId)()) || (0).toString().padStart(5, '0'); // 00000
    //incementUserId
    let incementuserId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incementuserId = `F-${incementuserId}`;
    return incementuserId;
});
exports.generateFacultyId = generateFacultyId;
// admin
const findLastAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const lastFaculty = yield users_model_1.User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
        .sort({
        createdAt: -1,
    })
        .lean();
    return (lastFaculty === null || lastFaculty === void 0 ? void 0 : lastFaculty.id) ? lastFaculty.id.substring(2) : undefined;
});
exports.findLastAdminId = findLastAdminId;
const generateAdminId = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentId = (yield (0, exports.findLastAdminId)()) || (0).toString().padStart(5, '0');
    let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
    incrementedId = `A-${incrementedId}`;
    return incrementedId;
});
exports.generateAdminId = generateAdminId;
