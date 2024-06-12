const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://pet-data.p.rapidapi.com/records',
  params: {
    orderBy: 'dataListIndex_asc',
    index: '0',
    limit: '500'
  },
  headers: {
    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
    'x-rapidapi-host': 'pet-data.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}

module.exports = apiClient;