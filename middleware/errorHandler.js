const errorHandler = (err, req, res, next) => {
    err.errorStatusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.errorStatusCode).json({
        status: err.status,
        message: err.message,
    });
};

export default errorHandler;