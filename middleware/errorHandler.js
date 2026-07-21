const errorHandler = (err, req, res, next) => {

    if (err.name === "ValidationError") {
        err.statusCode = 400;
        err.message = Object.values(err.errors)
            .map(val => val.message)
            .join(", ");
    }

    if (err.name === "CastError") {
        err.statusCode = 400;
        err.message = "Invalid ID";
    }

    if (err.code === 11000) {
        err.statusCode = 409;
        err.message = "Duplicate value";
    }

    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};

export default errorHandler;