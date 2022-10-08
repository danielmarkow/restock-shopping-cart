import {useReducer, useState, useEffect} from "react";

import {dataFetchReducer} from "../reducers/dataFetchReducer";

import axios from "axios";

function useData(urlProp) {
  const [url, setUrl] = useState(urlProp);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: null
  });

  const fetchData = async () => {
    console.log(new Date(), "fetched data");
    let didCancel = false;
    dispatch({type: "FETCH_INIT"});
    try {
      const result = await axios(url);
      if (!didCancel) {
        dispatch({type: "FETCH_SUCCESS", payload: result.data});
      }
    } catch (error) {
      if (!didCancel) {
        dispatch({type: "FETCH_FAILURE"});
        console.log("error: ", error);
      }
    }
  };

  useEffect(
      fetchData, [url]
  );

  return [state, setUrl];
}

export default useData;