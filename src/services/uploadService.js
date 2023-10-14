const admin = require('firebase-admin');

// Firebase 서비스 계정 키를 불러옵니다.
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_CONFIG);
const { InternalServerError } = require('../config/validateError');

// Firebase Admin SDK를 초기화합니다. 서비스 계정 키와 Storage 버킷의 URL을 설정합니다.
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'elice-project-1.appspot.com',
});

// Firebase Storage의 버킷 인스턴스를 얻어옵니다.
const bucket = admin.storage().bucket();

/**
 * 이미지를 업로드하고 업로드된 이미지의 공개 URL을 반환합니다.
 * @param {Object} file - 업로드할 이미지 파일 객체
 * @returns {Promise<string>} - 업로드된 이미지의 공개 URL
 */
const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    // 업로드할 이미지 파일에 대한 Blob을 생성합니다.
    const blob = bucket.file(file.originalname);
    // Blob에 쓰기 스트림을 생성합니다.
    const blobWriter = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype, // 파일의 MIME 타입을 설정합니다.
      },
    });

    // 업로드 중 에러가 발생한 경우 처리합니다.
    blobWriter.on('error', (err) => {
      console.error(err);

      reject('Error uploading image.'); // 에러 응답을 반환합니다.
    });

    // 업로드가 완료된 경우 처리합니다.
    blobWriter.on('finish', () => {
      // 업로드된 이미지의 공개 URL을 생성합니다.
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      resolve(publicUrl); // 공개 URL을 반환합니다.
    });

    // 파일 데이터를 BlobWriter에 쓰고 업로드를 완료합니다.
    blobWriter.end(file.buffer);
  });
};

// 라우터 등에서 이 함수를 사용할 수 있도록 외부로 노출합니다.
module.exports = {
  uploadImage,
};
