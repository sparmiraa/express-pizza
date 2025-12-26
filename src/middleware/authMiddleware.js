import ApiError from "../exceptions/apiError.js";
import tokenService from "../services/tokenService.js";

export default function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw ApiError.Unauthorized();
    }

    const [type, token] = authHeader.split(" ");

    if (type !== "Bearer" || !token) {
      throw ApiError.Unauthorized();
    }

    const payload = tokenService.extractUserIdFromAccess(token);

    if (!payload) {
      throw ApiError.Unauthorized();
    }

    req.user = {
      userId: payload.userId,
      roles: payload.roles,
    };

    next()
  } catch (e) {
    next(e);
  }
}
