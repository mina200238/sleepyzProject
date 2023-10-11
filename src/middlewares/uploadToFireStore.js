const admin = require('firebase-admin');
const storage = require('firebase/storage');

var serviceAccount = require('path/to/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

admin.initializeApp(firebaseConfig);
// const storage = firebase.storage();

const uploadToFireStore = async (req, res, next) => {
  const storageRef = await storage.ref().child('myimages');
  const folderRef = await storageRef.child(fileName);
  const uploadtask = folderRef.put(file);
  uploadtask.on(
    'state_changed',
    (snapshot) => {
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
};

module.exports = uploadToFireStore;
