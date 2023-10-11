const multerHandler = async (req, res, next) => {
  const imageFileName = req.file.filename;
  res.send({
    imageUrl: imageFileName,
    file: req.file,
  });

  req.filename = imageFileName;
  next();
};

module.exports = multerHandler;
