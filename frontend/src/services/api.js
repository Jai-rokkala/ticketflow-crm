import axios from "axios";

const API = axios.create({
  baseURL: "https://ticketflow-crm-production.up.railway.app",
});

export default API;