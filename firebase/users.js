import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import auth from '.';
import axios from 'axios';
import {googleProvider} from '@lib/firebase/index';

export async function register(form) {
  try {
    await createUserWithEmailAndPassword(
        auth, form.email, form.password).then(async (result) => {
      await setUserAndToken(result);
      const token = window.localStorage.getItem('AUTH_TOKEN');
      await setUserName(token, form.userName);
    });
  } catch (e) {
    throw new Error(e.code);
  }
}

export async function login(form) {
  try {
    await signInWithEmailAndPassword(
        auth, form.email, form.password).then(async (result) => {
      await setUserAndToken(result);
      const token = window.localStorage.getItem('AUTH_TOKEN');
      const config = {
        headers: {
          'Authorization': token,
        },
      };
      const res = await axios.get('/api/username', config);
      const curname = res.data.name;
      window.localStorage.setItem('USER_NAME', curname);
    });
  } catch (e) {
    throw new Error(e.code);
  }
}

export async function logout() {
  await signOut(auth).then(() => {

  }).catch((e) => {
    throw new Error(e.code);
  });
}

export async function googleLogin() {
  await signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        const curUser = await setUserAndToken(result);
        const curUserToken = window.localStorage.getItem('AUTH_TOKEN');
        setUserName(curUserToken, curUser.displayName);
      })
      .catch((e) => {
        console.log(e);
      });
}

async function setUserAndToken(result) {
  const user = result.user;
  const idToken = await user.getIdToken();
  const currentDate = new Date();
  const expiryDate = currentDate.setTime(currentDate.getTime() +
      0.8 * 60 * 60 * 1000);
  console.log(expiryDate);
  window.localStorage.setItem('AUTH_TOKEN', idToken);
  window.localStorage.setItem('USER', user);
  window.localStorage.setItem('TOKEN_EXPIRY', expiryDate);

  return user;
}

async function setUserName(token, username) {
  window.localStorage.setItem('USER_NAME', username);
  const bodyData = {
    name: username,
  };

  const config = {
    headers: {
      'Authorization': token,
    },
  };
  const response = await axios.post('/api/username', bodyData, config);
  console.log('Username saved:', response.data);
}

