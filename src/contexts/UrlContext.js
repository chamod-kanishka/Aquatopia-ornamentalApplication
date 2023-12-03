// ---------Inbuilt components & modules---------
import {createContext, useState} from 'react';

// Create context
const UrlContext = createContext();

const UrlProvider = ({children}) => {
  // Url state
  const [Urls, SetUrls] = useState({
    baseUrl: 'http://192.168.8.193:3300/api/',
    fileUrl: 'http://172.28.5.5:3300/uploads/',
    fishIdUrl: 'http://172.28.5.5:5000/',
    fishDisIdUrl: 'http://192.168.1.28:5002/',
    fishTrIdUrl: 'http://192.168.1.28:5003/',
    reenUrl: 'http://192.168.8.193:5004/',
  });

  return (
    <UrlContext.Provider
      value={{
        Urls,
      }}>
      {children}
    </UrlContext.Provider>
  );
};

export {UrlContext, UrlProvider};
