import axios from "axios";
import https from "https";

const serverInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_PROD,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export default serverInstance;