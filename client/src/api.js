import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE || "";

export function makeApi(getToken) {
  const api = axios.create({ baseURL });
  api.interceptors.request.use((c) => {
    const t = getToken();
    if (t) c.headers.Authorization = `Bearer ${t}`;
    return c;
  });
  return api;
}
