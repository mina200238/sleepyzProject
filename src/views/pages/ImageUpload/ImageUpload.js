// const firebaseConfig = {
//   apiKey: process.env.apiKey,
//   authDomain: process.env.authDomain,
//   projectId: process.env.projectId,
//   storageBucket: process.env.storageBucket,
//   messagingSenderId: process.env.messagingSenderId,
//   appId: process.env.appId,
//   measurementId: process.env.measurementId,
// };

const firebaseConfig = {
  apiKey: 'AIzaSyCNFUJLyedhCd9WwV12nS-4Glg3feiDD30',
  authDomain: 'elice-project-1.firebaseapp.com',
  projectId: 'elice-project-1',
  storageBucket: 'elice-project-1.appspot.com',
  messagingSenderId: '612920137847',
  appId: '1:612920137847:web:b7d11a75230d75b1d08e72',
  measurementId: 'G-WXDEVB52Z2',
};

const app = firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

const inp = document.querySelector('.inp');
const uploadBtn = document.querySelector('.upload');
const selectImgBtn = document.querySelector('.selectImage');
const progressbar = document.querySelector('.progress');
const img = document.querySelector('.img');
const body = document.querySelector('body');
const metaData = document.querySelector('.metaData');
const images = document.querySelector('.images');
const loading = document.querySelector('.loading');
const imageUpload = document.querySelector('.imageUpload');
const completeMsg = document.querySelector('.completeMsg');
let file;
let files;
let fileName;
let progress;
let uploadedFileName;

selectImgBtn.addEventListener('click', getImageData);

inp.addEventListener('change', getImageData);

const getImageData = (e) => {
  files = e.target.files;
  for (let i = 0; i < files.length; i++) {
    let imageData = document.createElement('span');
    imageData.className = 'filedata';
    imageData.style.display = 'block';
    imageData.innerHTML = files[i].name;
    metaData.appendChild(imageData);
  }
};

uploadBtn.addEventListener('click', uploadImage);

const uploadImage = async () => {
  for (let i = 0; i < files.length; i++) {
    let url = await uploadProcess(files[i], Math.round(Math.random() * 9999) + files[i].name);
    if (url) {
      loading.style.display = 'none';
      let image = document.createElement('img');
      image.style.display = 'block';
      image.setAttribute('src', url);
      image.className = 'img';
      images.appendChild(image);
    }
    if (i === files.length - 1) {
      completeMsg.innerHTML = `${files.length} files uploaded successfully`;
    }
  }
};

const uploadProcess = (file, fileName) => {
  return new Promise((resolve, reject) => {
    const storageRef = storage.ref().child('myimages');
    const folderRef = storageRef.child(fileName);
    const uploadtask = folderRef.put(file);
    uploadtask.on(
      'state_changed',
      (snapshot) => {
        loading.style.display = 'block';
        progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progress = Math.round(progress);
        progressbar.style.width = progress + '%';
        progressbar.innerHTML = progress + '%';
        uploadedFileName = snapshot.ref.name;
      },
      (error) => {
        reject(error);
      },
      () => {
        storage
          .ref('myimages')
          .child(uploadedFileName)
          .getDownloadURL()
          .then((url) => {
            console.log('URL', url);
            resolve(url);
          });
      },
    );
  });
};
