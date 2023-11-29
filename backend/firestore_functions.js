import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  defaultCategoryList,
  defaultCommandList,
} from '../components/default_commands';
import {default_commands_05} from '../components/default_commands_05';
import {default_commands_69} from '../components/default_commands_69';

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

  var commandList = defaultCommandList;
  if (cognitiveAge < 6) commandList = default_commands_05;
  else if (cognitiveAge < 10) commandList = default_commands_69;

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
      voice: {
        category: 'RNTTS',
        data: {
          language: 'en-US',
          name: 'en-us-x-iol-local',
        },
      },
      categories: defaultCategoryList,
      commands: commandList,
      isPremiumUser: false,
      purchaseToken: null,
    })
    .then(() => {
      failCallback('');
      successCallback();
    })
    .catch(error => {
      failCallback(error.code);
    });
}

export function getUserData(callback) {
  var userDoc = auth().currentUser.email;

  firestore()
    .collection('users')
    .doc(userDoc)
    .get()
    .then(snap => {
      callback(snap.data());
    });
}

export function getActiveBoard(boardID, callback) {
  firestore()
    .collection('boards')
    .doc(boardID)
    .get()
    .then(snap => {
      callback(snap.data());
    });
}

export function updateBoard(boardID, newBoard, callback) {
  firestore()
    .collection('boards')
    .doc(boardID)
    .update(newBoard)
    .then(() => callback())
    .catch(err => console.error(err));
}

export function saveNewBoard(boardIndex, newBoard, callback) {
  var UID = auth().currentUser.uid;
  const privateBoardID = UID + '_' + boardIndex;

  firestore()
    .collection('boards')
    .doc(privateBoardID)
    .set({...newBoard, public: false})
    .then(() => {
      callback(privateBoardID);
    })
    .catch(err => console.error(err.message));
}

export function getVoiceData(callback) {
  var userDoc = auth().currentUser.email;

  firestore()
    .collection('users')
    .doc(userDoc)
    .get()
    .then(snap => {
      callback(snap.get('voice'));
    });
}

export function setVoiceData(newVoice, callback) {
  var userDoc = auth().currentUser.email;

  firestore()
    .collection('users')
    .doc(userDoc)
    .update({
      voice: newVoice,
    })
    .then(() => callback())
    .catch(err => console.error(err));
}

export function getCommandList(callback) {
  var userDoc = auth().currentUser.email;

  firestore()
    .collection('users')
    .doc(userDoc)
    .get()
    .then(snap => {
      callback(snap.get('commands'));
    });
}

export function updateCommandList(newCommand, callback) {
  var userDoc = auth().currentUser.email;

  firestore()
    .collection('users')
    .doc(userDoc)
    .update({commands: firestore.FieldValue.arrayUnion(newCommand)})
    .then(() => callback())
    .catch(err => console.error(err));
}

export function setCommandList(newCommandList, callback) {
  var userDoc = auth().currentUser.email;

  firestore()
    .collection('users')
    .doc(userDoc)
    .update({commands: newCommandList})
    .then(() => callback())
    .catch(err => console.error(err));
}

export function updateCategoryList(newCategory, callback) {
  var userDoc = auth().currentUser.email;

  firestore()
    .collection('users')
    .doc(userDoc)
    .update({categories: firestore.FieldValue.arrayUnion(newCategory)})
    .then(() => callback())
    .catch(err => console.error(err));
}

export function setCategoryList(newCatList, callback) {
  var userDoc = auth().currentUser.email;

  firestore()
    .collection('users')
    .doc(userDoc)
    .update({categories: newCatList})
    .then(() => callback())
    .catch(err => console.error(err));
}

export function updateDatabase(update, callback) {
  var userDoc = auth().currentUser.email;

  firestore()
    .collection('users')
    .doc(userDoc)
    .update({...update})
    .then(() => callback())
    .catch(err => console.error(err));
}

export function addSavedBoardToUser(newBoardID, callback) {
  var userDoc = auth().currentUser.email;

  firestore()
    .collection('users')
    .doc(userDoc)
    .update({savedBoards: firestore.FieldValue.arrayUnion(newBoardID)})
    .then(() => callback())
    .catch(err => console.error(err));
}

export function validatePremiumSubscription(
  purchaseToken,
  validCallback,
  invalidCallback,
) {
  firestore()
    .collection('subscriptions')
    .doc(purchaseToken)
    .get()
    .then(resp => {
      console.log(resp.get('subscriptionState'));
      if (resp.get('subscriptionState') === 'SUBSCRIPTION_STATE_ACTIVE')
        validCallback();
      else invalidCallback();
    });
}
