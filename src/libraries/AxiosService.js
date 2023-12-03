// ---------Third-party components & modules---------
import axios from "axios";

// Function to handle axios http requests
const AxiosService = (config) => {
  return new Promise((resolve, reject) => {
    axios(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error.response.data);
      });
  });
};

export default AxiosService;
