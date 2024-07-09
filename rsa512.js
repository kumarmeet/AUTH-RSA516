/**
 * generate private key -> openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
 * generate public key -> openssl rsa -pubout -in private_key.pem -out public_key.pem
 */

const fs = require('fs');
const jwt = require('jsonwebtoken');

// Load RSA private key
const privateKey = fs.readFileSync('private_key.pem', 'utf8');

// Sample data to sign into the token (could be user information or other data)
const payload = {
  username: 'john.doe',
  role: 'admin'
};

// Create the JWT token
const token = jwt.sign(payload, privateKey, { algorithm: "RS512", expiresIn: "1h" });

console.log('JWT Token:');
console.log(token);


// Load RSA public key for verification
const publicKey = fs.readFileSync('public_key.pem', 'utf8');


// Verify JWT token
jwt.verify(token, publicKey, { algorithms: ['RS512'] }, (err, decoded) => {
  if (err) {
    console.error('JWT Verification Error:', err);
    return;
  }

  console.log('Decoded JWT Payload:');
  console.log(decoded);
});

