const Flatted = require('flatted');

const fs = require('fs');

const BlindSignature = require('blind-signatures');

const RSA_KEY = BlindSignature.keyGeneration({ b: 2048 });
const NE_KEY = RSA_KEY.keyPair;

console.log(RSA_KEY, "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%\n\n\n", NE_KEY);

fs.writeFileSync('./../../.security/blind/NE_.key', Flatted.stringify(NE_KEY));
fs.writeFileSync('./../../.security/blind/RSA_.key', Flatted.stringify(RSA_KEY));

