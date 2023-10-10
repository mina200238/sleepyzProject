// Firebase 앱 모듈을 가져옵니다.
import firebase from 'firebase/app';

// Firebase 스토리지 모듈을 가져옵니다.
import 'firebase/storage';

// Firebase 프로젝트의 구성 정보를 설정합니다. 여기서는 API 키, 인증 도메인, 프로젝트 ID 등이 포함됩니다.
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Firebase 앱을 초기화합니다.
firebase.initializeApp(firebaseConfig);

// 이미지를 업로드하는 함수인 uploadImage 함수를 정의합니다. 이 함수는 파일 객체(file)를 매개변수로 받습니다.
function uploadImage(file) {
  // 스토리지에 대한 참조(storageRef)를 생성합니다.
  const storageRef = firebase.storage().ref();

  // 현재 시간과 파일 이름을 조합하여 고유한 이미지 이름(imageName)을 생성합니다.
  const imageName = new Date().getTime() + '_' + file.name;

  // 이미지 참조(imageRef)를 생성하고 해당 경로에 이미지 파일을 저장하기 위해 사용됩니다.
  const imageRef = storageRef.child(`images/${imageName}`);

  // .put 메소드는 파일(file)을 스토리지에 업로드하는 역할을 합니다.
  return imageRef
    .put(file)
    .then((snapshot) => {
      // 업로드가 성공적으로 완료되면 반환된 snapshot에서 다운로드 URL을 얻어옵니다.
      return snapshot.ref.getDownloadURL();
    })
    .catch((error) => {
      // 에러가 발생했으면 콘솔에 로그를 출력하고 에러 객체를 던집니다.
      console.error('Error uploading image:', error);
      throw error;
    });
}

// HTML 문서에서 id가 "file-input"인 요소(파일 입력 필드)를 선택하여 변수 fileInput에 할당합니다.
const fileInput = document.getElementById('file-input');

fileInput.addEventListener('change', async (event) => {
  // "change" 이벤트 발생 시 (사용자가 파일 입력 필드에서 새 파일 선택 시), 실행되는 비동기 콜백 함수입니다.

  const file = event.target.files[0];

  try {
    // uploadImage 함수가 비동기적으로 호출되고, 성공적으로 실행되면 반환된 imageUrl을 출력합니다.
    const imageUrl = await uploadImage(file);
    console.log('Image URL:', imageUrl);
  } catch (error) {
    // 에러가 발생하면 콘솔에 로그를 출력합니다.
    console.error('Error:', error);
  }
});
