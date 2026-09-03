import type { IRawNode } from "../types/company.ts";
import { FETCH_STATUS, type TFetchState } from "../types/state.ts";
import { useCallback, useEffect, useState } from "react";

const API_URL = "/api/company";

export const useCompanyData = () => {
  const [state, setState] = useState<TFetchState<IRawNode>>({
    status: FETCH_STATUS.LOADING,
  });
  const [retryCount, setRetryCount] = useState(0); // used as a retry trigger

  const refetch = useCallback(() => {
    setState({ status: FETCH_STATUS.LOADING });
    setRetryCount((prevCount) => prevCount + 1);
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    fetch(API_URL, { signal: abortController.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setState({ status: FETCH_STATUS.SUCCESS, data }))
      .catch((error) => {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
        setState({
          status: FETCH_STATUS.ERROR,
          error: error.message ?? "Unknown error",
        });
      });

    return () => abortController.abort();
  }, [retryCount]);

  return { ...state, refetch };
};
