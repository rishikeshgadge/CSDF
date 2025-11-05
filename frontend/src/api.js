import axios from 'axios';


// Change this to your backend URL in production
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';


const instance = axios.create({ baseURL });


export default instance;