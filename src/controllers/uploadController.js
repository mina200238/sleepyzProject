const { BadRequestError, InternalServerError } = require('../config/validateError');
const uploadService = require('../services/uploadService');

const uploadImage = async (req, res, next) => {
  try {
    const file = req.file; // 업로드된 파일 객체를 얻어옵니다.
    console.log('파일: ', file);

    if (!file) {
      // 파일이 업로드되지 않은 경우 에러 응답을 반환합니다.
      throw new BadRequestError('No file uploaded.');
    }

    const imageUrl = await uploadService.uploadImage(file);

    if (!imageUrl) throw new InternalServerError('Error uploading image.');

    return res.status(200).send(imageUrl);
  } catch (err) {
    // 예상치 못한 에러가 발생한 경우 에러 응답을 반환합니다.
    console.error(err);
    next(err);
  }
};

module.exports = { uploadImage };
