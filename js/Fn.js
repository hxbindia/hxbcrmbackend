export function responseFn(
    res,
    status = 200,
    error = false,
    message = "",
    data = null,
) {
    return res.status(status).json({
        error,
        message,
        data,
    });
}
