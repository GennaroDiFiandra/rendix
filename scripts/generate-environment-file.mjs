import fs from 'fs';
import path from 'path';

const envFileContent = `
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: '${process.env.FIREBASE_API_KEY}',
  authDomain: '${process.env.FIREBASE_AUTH_DOMAIN || 'angular-apps-87b70.firebaseapp.com'}',
  projectId: '${process.env.FIREBASE_PROJECT_ID || 'angular-apps-87b70'}',
  storageBucket: '${
    process.env.FIREBASE_STORAGE_BUCKET || 'angular-apps-87b70.firebasestorage.app'
  }',
  messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID || '729379065638'}',
  appId: '${process.env.FIREBASE_APP_ID}',
  measurementId: '${process.env.FIREBASE_MEASUREMENT_ID}',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const environment = {
  production: true,
  firebase: firebaseConfig,
  firebaseApp: app,
  firebaseAnalytics: analytics
};
`;

const outputPath = path.resolve(process.cwd(), 'src/environments/environment.ts');
fs.writeFileSync(outputPath, envFileContent);
console.log('Production environment file generated from GitHub Secrets.');
