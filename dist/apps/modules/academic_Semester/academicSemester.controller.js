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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicSemesterController = void 0;
const academicSemester_service_1 = require("./academicSemester.service");
const catchAsync_1 = require("../../../shared/catchAsync");
const sendResponse_1 = require("../../../shared/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
const quaryPick_1 = require("../../../shared/quaryPick");
const pagination_1 = require("../../constant/pagination");
const CreateAcademicSemester = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemester = __rest(req.body, []);
    // console.log("first", academicSemester)
    const result = yield academicSemester_service_1.AcademicSemesterServices.createAcademicSemester(academicSemester);
    // create a senrespons function
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result.data,
        meta: result.meta,
        message: 'Academic Semester created successfully',
    });
    // next();
}));
// pagination limite academic semester
const getAllSemester = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filtering = (0, quaryPick_1.queryPick)(req.query, [
        'searchTerm',
        'title',
        'code',
        'year',
    ]);
    const paginationOption = (0, quaryPick_1.queryPick)(req.query, pagination_1.pagintionField);
    // console.log(paginationOption)
    const result = yield academicSemester_service_1.AcademicSemesterServices.getAllSemesterServe(filtering, paginationOption);
    // create a senrespons function
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        meta: result.meta,
        data: result.data,
        message: 'Academic Semester data display successfully',
    });
    next();
}));
//get singel semester
const getSingelSemester = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const semester = req.params.id;
    const result = yield academicSemester_service_1.AcademicSemesterServices.singelSemester(semester);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'A singel semester Show the display successfully',
    });
}));
// Update singel semester
const updateSemester = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterid = req.params.id;
    const updateData = req.body;
    const result = yield academicSemester_service_1.AcademicSemesterServices.updateSemester(semesterid, updateData);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'A singel semester updated successfully',
    });
}));
const DeleteSingelSemester = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield academicSemester_service_1.AcademicSemesterServices.DeleteSemester(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        data: result,
        message: 'A singel semester Delete successfully',
    });
}));
exports.AcademicSemesterController = {
    CreateAcademicSemester,
    getAllSemester,
    getSingelSemester,
    updateSemester,
    DeleteSingelSemester,
};
