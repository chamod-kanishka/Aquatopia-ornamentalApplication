// ---------Inbuilt components & modules---------
import {useState} from 'react';

// ---------Custom components & modules---------
import {AxiosService} from '../libraries';

const UseHttpRequest = () => {
  // Loading state
  const [IsLoading, SetIsLoading] = useState(false);

  // Response data state
  const [ResponseData, SetResponseData] = useState(null);

  // Request error state
  const [RequestError, SetRequestError] = useState(null);

  // Function to send http requests
  const SendRequest = async config => {
    SetIsLoading(true);
    SetRequestError(null);
    SetResponseData(null);

    try {
      const response = await AxiosService(config);
      SetResponseData(response);
    } catch (error) {
      SetRequestError(error);
    }

    SetIsLoading(false);
  };

  return {IsLoading, ResponseData, RequestError, SendRequest};
};

export default UseHttpRequest;
