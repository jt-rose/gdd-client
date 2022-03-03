import axios from "axios";

export const serverURL =
  process.env.NODE_ENV === "production"
    ? "https://gdd-server.herokuapp.com"
    : "http://localhost:8000";

export const get = (destination) => {
  return axios.get(serverURL + destination, { withCredentials: true });
};
export const post = (destination, body) => {
  return post(serverURL + destination, body, { withCredentials: true });
};
export const put = (destination, body) => {
  return axios.put(serverURL + destination, body, { withCredentials: true });
};
export const remove = (destination) => {
  return axios.delete(serverURL + destination, { withCredentials: true });
};
