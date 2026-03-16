class AppError extends Error {
    constructor(code, message = code) {
        super(message);
        this.code = code;
    }
}

module.exports = AppError;
