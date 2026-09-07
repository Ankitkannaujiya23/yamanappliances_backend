import ApiResponse from "../utils/apiResponse.js";


const errorHandler = (err, req, res, next) => {

    console.error(err);

    return ApiResponse.error(
        res,
        err.message || "Internal Server Error",
        process.env.NODE_ENV === "development"
            ? err.stack
            : null,
        err.statusCode || 500
    );

};

export default errorHandler;