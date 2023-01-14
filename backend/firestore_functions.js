import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export function storeUserInfo(
  first,
  last,
  chronologicalAge,
  cognitiveAge,
  successCallback,
  failCallback,
) {
  if (
    first === '' ||
    last === '' ||
    chronologicalAge === -1 ||
    cognitiveAge === -1
  ) {
    failCallback('Please fill in all fields');
    return;
  }

  var currentUser = auth().currentUser;
  console.log(currentUser.uid);

  firestore()
    .collection('users')
    .doc(currentUser.email)
    .set({
      UID: currentUser.uid,
      firstName: first,
      lastName: last,
      chronologicalAge: chronologicalAge,
      cognitiveAge: cognitiveAge,
    })
    .then(() => {
      failCallback('');
      successCallback();
    })
    .catch(error => {
      failCallback(error.code);
    });
}

export function getUserName(callback) {
  var userDoc = auth().currentUser.email;

  firestore()
    .collection('users')
    .doc(userDoc)
    .get()
    .then(snap => {
      callback(snap.get('firstName'));
    });
}
