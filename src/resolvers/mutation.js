require('dotenv').config();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { AuthenticationError, ForbiddenError } = require("apollo-server-express");


module.exports = {
    sign: async (parent, args, { models, currentCitizenIdentity }) => {
        // check for user information in the context
        if(!currentCitizenIdentity) {
            throw new AuthenticationError("You must authenticate first");
        }
        return "Message well signed";
    },
};

