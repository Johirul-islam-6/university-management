"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
//<------------------ All Router Import-------------->
const globalErrorHandelar_1 = require("./apps/middlewares/globalErrorHandelar");
const routes_1 = __importDefault(require("./apps/routes"));
const http_status_1 = __importDefault(require("http-status"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import { ApiError } from './errors/ApiError'
// cors use
app.use((0, cors_1.default)());
// parser
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
// router
app.use('/api/v1', routes_1.default);
//global Error Handelar
app.use(globalErrorHandelar_1.globalErrorHandeler);
//handle not found
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found',
            },
        ],
    });
    next();
});
exports.default = app;
