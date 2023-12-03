// ---------Inbuilt components & modules---------
import { createContext, useState } from "react";

// Create context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Auth data state
  const [AuthData, SetAuthData] = useState(null);

  // Function to save auth data to context
  const SaveAuthData = (data) => {
    SetAuthData(data);
  };

  // Function to clear auth from context
  const ClearAuthData = () => {
    SetAuthData(null);
  };

  return (
    <AuthContext.Provider
      value={{
        AuthData,
        SaveAuthData,
        ClearAuthData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
