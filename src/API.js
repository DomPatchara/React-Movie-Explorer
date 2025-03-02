import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

// Set Base_URL //
const apiClient = axios.create({baseURL: BASE_URL});

//  Axios Interceptors : ข้อดีคือ Auto Configure HTTP request
apiClient.interceptors.request.use(async function (config) {
    config.headers.Accept = "application/json";  
    config.headers.Authorization = `Bearer ${API_KEY}`; 
    return config;
  });

export default apiClient