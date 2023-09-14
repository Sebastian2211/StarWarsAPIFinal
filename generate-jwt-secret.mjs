import crypto from 'crypto';

// Rest of your code here


// Generate a random JWT secret key
const jwtSecretKey = crypto.randomBytes(32).toString('hex');
console.log('JWT Secret Key:', jwtSecretKey);
