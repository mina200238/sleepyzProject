// errorHandler.js
module.exports = (err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).send({
    data: null,
    message: err.message || '잘못된 요청입니다.',
  });
};
