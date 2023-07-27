"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_routes_1 = require("../modules/users/users.routes");
const academicSemester_routes_1 = require("../modules/academic_Semester/academicSemester.routes");
const academicFaculty_route_1 = require("../modules/academicFaculty/academicFaculty.route");
const academicDepartment_routes_1 = require("../modules/academicDepartment/academicDepartment.routes");
const student_routes_1 = require("../modules/student/student.routes");
const faculty_route_1 = require("../modules/faculty/faculty.route");
const admin_route_1 = require("../modules/admin/admin.route");
const managementDepartment_route_1 = require("../modules/managementDepartment/managementDepartment.route");
const auth_routes_1 = require("../modules/auth/auth.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: users_routes_1.UserRoutes,
    },
    {
        path: '/academic-semesters',
        route: academicSemester_routes_1.SemesterRoute,
    },
    {
        path: '/academic-faculties',
        route: academicFaculty_route_1.AcademicFacultyRoutes,
    },
    {
        path: '/academic-departments',
        route: academicDepartment_routes_1.academicDepartmentRoutes,
    },
    {
        path: '/management-departments',
        route: managementDepartment_route_1.ManagementDepartmentRoutes,
    },
    {
        path: '/students',
        route: student_routes_1.StudentRoutes,
    },
    {
        path: '/faculties',
        route: faculty_route_1.FacultyRoutes,
    },
    {
        path: '/admins',
        route: admin_route_1.AdminRoutes,
    },
    {
        path: '/auth',
        route: auth_routes_1.authRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
