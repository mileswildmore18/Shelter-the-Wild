const { request } = require('graphql-request');
const axios = require('axios');

//Send a Graphql query or mutation
async function gql(query, operationName, variables = {}) {
    const endpoint = 'shelter_db'
    const headers = {
        'Authoriztion': `Bearer ${process.env.RAPIDAPI_KEY}`,
        'Content-Type': 'application/json',
    };

    try {
        const result = await request(endpoint, query, variables, { headers });
        return result;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = gql;