import {adminAuth} from '@/lib/firebase/admin';

export async function getUserId(userToken) {
  return new Promise((resolve, reject) => {
    adminAuth.verifyIdToken(userToken).then((decodedToken) => {
      const uid = decodedToken.uid;
      resolve(uid);
    }).catch((err) => {
      reject(err);
    });
  });
}
