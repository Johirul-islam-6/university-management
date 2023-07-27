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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = require("../../../errors/ApiError");
const users_model_1 = require("../users/users.model");
const config_1 = __importDefault(require("../../../config"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const loingUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, password } = payload;
    // static method usered resive id
    const isUserExist = yield users_model_1.User.isUserExist(id);
    if (!isUserExist) {
        throw new ApiError_1.ApiError(http_status_1.default.NOT_FOUND, 'user does not exist', '');
    }
    // password matching bcrypt
    if (isUserExist.password &&
        !(yield (users_model_1.User === null || users_model_1.User === void 0 ? void 0 : users_model_1.User.isPasswordMatch(password, isUserExist.password)))) {
        throw new ApiError_1.ApiError(http_status_1.default.UNAUTHORIZED, 'Password is Incorrect !', '');
    }
    // ========================= jwt token start ============================
    // create access token
    const { id: userId, role, needPasswordChange } = isUserExist;
    const AccessToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.JWT.secret, config_1.default.JWT.expires_in);
    // create  refresh token
    const RefreshToken = jwtHelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.JWT.refresh_secret, config_1.default.JWT.refresh_expires_in);
    // console.log({AccessToken, RefreshToken,needPasswordChange})
    return {
        AccessToken,
        RefreshToken,
        needPasswordChange,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // invalid token - synchronous
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifiedToken(token, config_1.default.JWT.refresh_secret);
        // console.log(verifiedToken)
    }
    catch (err) {
        throw new ApiError_1.ApiError(http_status_1.default.FORBIDDEN, 'Invalid refresh token', '');
    }
    const { userId } = verifiedToken;
    // checking refresh token user checked database user
    const isUserExist = yield users_model_1.User.isUserExist(userId);
    if (!isUserExist) {
        throw new ApiError_1.ApiError(http_status_1.default.NOT_FOUND, 'user does not exist !', '');
    }
    // create jwt access token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({ id: isUserExist.id, role: isUserExist.role }, config_1.default.JWT.secret, config_1.default.JWT.expires_in);
    return {
        AccessToken: newAccessToken,
    };
});
// change password
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { oldPassword, newPassword } = payload;
    // const isUserExist = await User.isUserExist(user?.userId)
    // alternative way
    const isUserExist = yield users_model_1.User.findOne({ id: user === null || user === void 0 ? void 0 : user.userId }).select('+password');
    if (!isUserExist) {
        throw new ApiError_1.ApiError(http_status_1.default.NOT_FOUND, 'user does not exist', '');
    }
    //checking old password
    if (isUserExist.password &&
        !(yield (users_model_1.User === null || users_model_1.User === void 0 ? void 0 : users_model_1.User.isPasswordMatch(oldPassword, isUserExist.password)))) {
        throw new ApiError_1.ApiError(http_status_1.default.UNAUTHORIZED, 'Old Password is Incorrect !', '');
    }
    //// alternative way
    // // bcrypt hashing password
    // const newHashingPassword = await bcrypt.hash(newPassword,Number(config.bcrypt_numbers as string))
    // // update password
    // const updateData = {
    //   password : newHashingPassword,
    //   needPasswordChange : false,
    //   passwordChangeAT : new Date()
    // }
    //  await User.findOneAndUpdate({id : user?.userId}, updateData)
    // updatein save method
    isUserExist.needPasswordChange = false;
    isUserExist.password = newPassword;
    isUserExist.save();
});
exports.AuthServices = {
    loingUser,
    refreshToken,
    changePassword,
};
