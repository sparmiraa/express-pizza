import HttpStatus from "../constants/httpStatus.js";

export default class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message, errors = []) {
    return new ApiError(HttpStatus.BAD_REQUEST, message, errors);
  }

  static Unauthorized() {
    return new ApiError(HttpStatus.UNAUTHORIZED, "Пользователь не авторизован");
  }

  static NotFound() {
    return new ApiError(HttpStatus.NOT_FOUND, "Ресурс не найден");
  }
}
