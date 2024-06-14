import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AxiosReq = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [breed, setBreed] = useState('');
  // const [name, setName] = useState('')

  useEffect(() => {
    const fetchPetData = async () => {
      const options = {
        method: 'GET',
        url: 'https://pet-data.p.rapidapi.com/records',
        params: {
          orderBy: 'dataListIndex_asc',
          index: '0',
          limit: '500',
          breed: {breed},
        },
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
          'x-rapidapi-host': 'pet-data.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setData(response.data);
        console.log(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchPetData();
  }, []);
  return (
    <>
    {error && <p>Error: {error.message}</p>}
    {data && <p>Fetch successful</p>}
    </>
    
  )}
  export default AxiosReq;

