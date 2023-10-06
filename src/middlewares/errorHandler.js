// errorHandler.js
module.exports = (err, req, res, next) => {
    res.status(res.statusCode || 500).send(
        {
            "data": null,
            "message": err.message || "잘못된 요청입니다."
        }
    )
};
