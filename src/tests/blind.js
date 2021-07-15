const BlindSignature = require('blind-signatures');

const k = BlindSignature.keyGeneration({ b: 2048 }).keyPair;


console.log(k);