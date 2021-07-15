const BlindSignature = require('blind-signatures');
const fs = require("fs");
const path = require("path");
const Flatted = require("flatted");


const NE_KEY_FILE_PATH = path.join(__dirname, "..", "..", ".security", "blind", "NE.key");
const RSA_KEY_FILE_PATH = path.join(__dirname, "..", "..", ".security", "blind", "RSA.key");


module.exports = {
    getLipsum: (parent, args, { models }) => {
        // find a user given the curent user context
        return "lorem ipsum o...";
    },        
    getBlindingKeyPair: async (parent, args, { models }) => {

        // TODO: store secret information with vaults technologies 
        if(!(process.env.FLATTED_NE_KEY || process.env.FLATTED_RSA_KEY)) { // No FLATTED_NE_KEY and FLATTED_RSA_KEY
            
            // create FLATTED_NE_KEY and FLATTED_RSA_KEY through NE_KEY_FILE_PATH and RSA_KEY_FILE_PATH
            fs.access(NE_KEY_FILE_PATH, fs.F_OK, (err) => {
                if (err) {
                    console.log("No key files");
                    // No key files : Gotta create them and load keys in process.env
                    // TODO: write promise helper for blinding                   
                    const RSA_KEY = BlindSignature.keyGeneration({ b: 2048 });
                    const NE_KEY = RSA_KEY.keyPair;

                    
                    // TODO: write promise for stringifying operation
                    process.env["FLATTED_RSA_KEY"] = Flatted.stringify(RSA_KEY);
                    process.env["FLATTED_NE_KEY"] = Flatted.stringify(NE_KEY);
                    
                    // TODO: write files in loop using promise 
                    // https://stackoverflow.com/questions/45040277/nodejs-write-multiple-files-in-for-loop
                    fs.writeFile(RSA_KEY_FILE_PATH, process.env.FLATTED_RSA_KEY, err => { 
                        if (err) {
                            console.log("RSA key file creation failed"); 
                            // console.error(err);
                            return
                        }
                        // RSA.key writing success
                        // console.log("RSA.key written with success")
                    });

                    fs.writeFile(NE_KEY_FILE_PATH, process.env.FLATTED_NE_KEY, err => {
                        if (err) {
                            console.log("NE key file creation failed");
                            // console.error(err)
                            return
                        }
                        // NE.key writing success
                        // console.log("NE.key written with success");
                    });

                    console.error(err)
                    return "error";
                } else { // NE_KEY_FILE_PATH exists

                    // load NE_KEY_FILE_PATH content into env under FLATTED_NE_KEY                
                    fs.readFile(NE_KEY_FILE_PATH, "utf8" , (err, data) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                        console.log(data)
                        process.env["FLATTED_NE_KEY"] = data;

                    })
                    return process.env.FLATTED_NE_KEY;
                }
            })

        } else { // FLATTED_NE_KEY and FLATTED_RSA_KEY exists
            return process.env.FLATTED_NE_KEY;
        }

    }
}