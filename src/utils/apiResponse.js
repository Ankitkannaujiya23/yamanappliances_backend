class ApiResponse {
    constructor(success, message, data = null, errors = null) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.errors = errors;
    }

    static success(res, message, data = null, statusCode = 200) {
        return res.status(statusCode).json(
            new ApiResponse(true, message, data)
        );
    }

    static error(res, message, errors = null, statusCode = 500) {
        return res.status(statusCode).json(
            new ApiResponse(false, message, null, errors)
        );
    }
}

export default ApiResponse;