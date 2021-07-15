const { gql } = require("apollo-server-express");
 
const typeDefs = gql`
    scalar DateTime

    type Query {
        getLipsum: String
        getBlindingKeyPair: String!        
    }

    type Mutation {
        sign(blindedMsg: String): String
    }
`;

module.exports = typeDefs;