import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTVjM2YyNDFjMDY3M2FlZDEwMmI4YTJmZWE3YWZjOSIsIm5iZiI6MTczOTc3OTE2OS42LCJzdWIiOiI2N2IyZWM2MWFhYWMzYjE2NzRlMGRkODYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.V3QecxsQxxNUAAsmrZHDql_heYW9b4OGYLnsOFru-o0"   //import.meta.env.VITE_TMDB_API_KEY

// Set Base_URL //
const apiClient = axios.create({baseURL: BASE_URL});

//  Axios Interceptors : ข้อดีคือ Auto Configure HTTP request
apiClient.interceptors.request.use(async function (config) {
    config.headers.Accept = "application/json";  
    config.headers.Authorization = `Bearer ${API_KEY}`; 
    return config;
  });

export default apiClient