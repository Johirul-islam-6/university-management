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
exports.AcademicSemesterServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = require("../../../errors/ApiError");
const academic_constant_1 = require("./academic.constant");
const academicSemester_model_1 = require("./academicSemester.model");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createAcademicSemester = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.AcademicSemester.create(payload);
    // checking semester final title and code
    if (academic_constant_1.AcademicSemesterTitleCodeMapping[payload.title] !== payload.code) {
        throw new ApiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'semester name not matching semester code', '');
    }
    return result;
});
// get semester data querys
const getAllSemesterServe = (filtering, paginationOption) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filtering, filtersData = __rest(filtering, ["searchTerm"]);
    const andConditions = [];
    // serchdata resive
    if (searchTerm) {
        andConditions.push({
            $or: academic_constant_1.academicSemesterSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // filter data resive
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // const {searchTerm} = filtering;
    // const andCodition = [
    // {
    //    $or : [
    //   {
    //     title : {
    //       $regex : searchTerm,
    //       $options :'i',
    //     },
    //   },
    //   {
    //     code : {
    //       $regex : searchTerm,
    //       $options :'i',
    //     },
    //   },
    //   {
    //     year : {
    //       $regex : searchTerm,
    //       $options :'i',
    //     },
    //   },
    //  ],
    // }
    // ]
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.HelperPagination.calculationPagination(paginationOption);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // condition display data show
    const whereConditons = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield academicSemester_model_1.AcademicSemester.find(whereConditons)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield academicSemester_model_1.AcademicSemester.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
//singel a semester
const singelSemester = (semesterId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield academicSemester_model_1.AcademicSemester.findOne({ _id: semesterId });
    return result;
});
// update semester
const updateSemester = (semesterId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // const id = { _id : semesterId};
    // checking semester final title and code
    if (payload.title &&
        payload.code &&
        academic_constant_1.AcademicSemesterTitleCodeMapping[payload.title] !== payload.code) {
        throw new ApiError_1.ApiError(http_status_1.default.BAD_REQUEST, 'semester name not matching semester code', '');
    }
    const result = yield academicSemester_model_1.AcademicSemester.findOneAndUpdate({ _id: semesterId }, payload, { new: true });
    return result;
});
//delet semester
const DeleteSemester = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterId = { _id: id };
    const result = yield academicSemester_model_1.AcademicSemester.findByIdAndDelete(semesterId, {
        new: true,
    });
    return result;
});
exports.AcademicSemesterServices = {
    createAcademicSemester,
    getAllSemesterServe,
    singelSemester,
    updateSemester,
    DeleteSemester,
};
