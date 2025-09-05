import axios from "axios";
import https from "https";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL_PROD,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false, // отключает проверку сертификата
  }),
});

export default instance;
