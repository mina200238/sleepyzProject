// 필요한 모듈과 패키지를 불러옵니다.
const multer = require('multer'); // 파일 업로드를 처리하기 위한 미들웨어
const { Router } = require('express'); // Express 라우터 클래스를 불러옵니다.
const { uploadImage } = require('../controllers/uploadController');

// 이미지 업로드를 처리하기 위한 Multer 설정입니다.
const upload = multer({ storage: multer.memoryStorage() });

// Express 라우터를 생성합니다.
const router = Router();

// POST 요청을 처리하는 라우터 핸들러를 정의합니다.
router.post('/', upload.single('image'), uploadImage);

// 라우터를 외부에서 사용할 수 있도록 내보냅니다.
module.exports = router;
