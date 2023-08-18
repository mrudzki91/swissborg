import axios from 'axios';

const { get } = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: { 'Content-Type': 'application/json' },
});

export { get };
