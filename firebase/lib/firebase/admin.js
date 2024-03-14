const admin = require('firebase-admin');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      client_email: process.env.ADMIN_CLIENT_EMAIL,
      private_key: process.env.ADMIN_PRIVATE_KEY,
      project_id: process.env.ADMIN_PROJECT_ID,
    }),
  });
}

const adminAuth=admin.auth();
export {adminAuth};
