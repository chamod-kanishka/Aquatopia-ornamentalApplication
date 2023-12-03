// ---------Inbuilt components & modules---------
import { useEffect, useState } from "react";

// ---------Third-party components & modules---------
import AsyncStorage from "@react-native-async-storage/async-storage";

const UseAsyncStorage = (key) => {
  // Value state
  const [Values, SetValues] = useState(null);

  useEffect(() => {
    FetchValues();
  }, [key]);

  // Function to fetch data
  const FetchValues = async () => {
    try {
      const storedValue = await AsyncStorage.getItem(key);
      if (storedValue !== null) {
        SetValues(JSON.parse(storedValue));
      }
    } catch (error) {
      console.log("Error loading data from AsyncStorage:", error);
    }
  };

  // Function to save values
  const SaveValues = async (newValue) => {
    try {
      const jsonValue = JSON.stringify(newValue);
      SetValues(jsonValue);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.log("Error saving data to AsyncStorage:", error);
    }
  };

  // Function to clear values
  const ClearValues = async () => {
    try {
      SetValues(null);
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log("Error removing data from AsyncStorage:", error);
    }
  };

  return { Values, SaveValues, ClearValues };
};

export default UseAsyncStorage;
