import PropTypes from "prop-types";
import { createContext, useCallback, useContext, useEffect, useState, useMemo } from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [last, setLast] = useState(null);

  const getData = useCallback(async () => {
    try {
      const loadedData = await api.loadData();
      setData(loadedData);

      if (loadedData && loadedData.events && loadedData.events.length > 0) {
        setLast(loadedData.events[loadedData.events.length - 1]);
      } else {
        setLast(null);
      }
      console.log("Data loaded:", loadedData);
    } catch (err) {
      setError(err);
      setLast(null);
    }
  }, []);

  useEffect(() => {
    if (data === null) {
      getData();
    }
  }, [data, getData]);

  const contextValue = useMemo(() => ({
    data,
    error,
    last,
  }), [data, error, last]);

  console.log("last in DataProvider:", last);

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};
DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useData = () => useContext(DataContext);

export default DataContext;
