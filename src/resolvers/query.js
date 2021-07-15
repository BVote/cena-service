const BlindSignature = require('blind-signatures');
const fs = require("fs");
const path = require("path");
const Flatted = require("flatted");


// const blindKeysDirPath = "./../../.security/blind/NE.key";
const blindKeysDirPath = path.join(__dirname, "..", "..", ".security", "bind", "NE.key");

// const key = BlindSignature.keyGeneration({ b: 2048 }).keyPair;
// console.log(key);


module.exports = {
        getLipsum: (parent, args, { models }) => {
            // find a user given the curent user context
           return "lorem ipsum o...";
        },        
        getBlindingKeyPair: async (parent, args, { models }) => {

            // RSA.key et NE.key existent
                // retourner NE.key sérialisé
            // Si non
                // créé RSA.key et NE.key les sérialisé puis retourner NE.key

            // TODO: store secret information with vaults technologies 
            if(!(process.env.BLIND_NE_KEY | process.env.BLIND_RSA_KEY)) {
                console.log("there is no shit");
                fs.access(blindKeysDirPath, fs.F_OK, (err) => {
                    if (err) {
                      console.error(err)
                      return "error";
                    }
                    return "Cool keys";
                })

            } else {
                return process.env.BLIND_NE_KEY;
            }

            // process.exit();
            
            
        }
    }