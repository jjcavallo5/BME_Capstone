import auth from '@react-native-firebase/auth';

export function registerUser(
  email,
  pass,
  confirmPass,
  successCallback,
  failCallback,
) {
  if (email === '' || pass === '' || confirmPass === '') {
    failCallback('Please fill out all fields');
    return;
  }
  var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailFormat.test(email)) {
    failCallback('Invalid email address');
    return;
  }

  if (pass.length < 6) {
    failCallback('Password must be at least 6 characters');
    return;
  }
  if (pass !== confirmPass) {
    failCallback("Passwords don't match");
    return;
  }

  //! BACKEND
  auth()
    .createUserWithEmailAndPassword(email, pass)
    .then(() => {
      failCallback('');
      successCallback();
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        failCallback('Email address already in use');
      } else if (error.code === 'auth/invalid-email') {
        failCallback('Invalid email address');
      } else {
        failCallback(error.code);
      }
    });
}

export function loginUser(email, pass, successCallback, failCallback) {
  if (email === '' || pass === '') {
    failCallback('Please fill out all fields');
    return;
  }

  //! BACKEND
  auth()
    .signInWithEmailAndPassword(email, pass)
    .then(() => {
      failCallback('');
      successCallback();
    })
    .catch(error => {
      if (error.code === 'auth/wrong-password') {
        failCallback('Password is incorrect');
      } else if (error.code === 'auth/user-not-found') {
        failCallback('Email not recognized');
      } else {
        failCallback(error.code);
      }
    });
}
