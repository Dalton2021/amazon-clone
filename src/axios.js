import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-clone-8b8f0.cloudfunctions.net/api",
});

export { instance };


// Local host version of instance
//http://localhost:5001/clone-8b8f0/us-central1/api