export const serverURL =
  process.env.NODE_ENV === "production"
    ? "https://gdd-server.herokuapp.com/"
    : "http://localhost:8000/";
