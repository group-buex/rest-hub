import { useState } from "react";
import toast from "react-hot-toast";

// axios post
export function useApiHandler(apiCall, useToast: boolean) {
  const [reqState, setReqState] = useState({
    error: null,
    data: null,
    loading: false,
    status: null,
  });

  const handler = async (...data) => {
    return new Promise(async (resolve, reject) => {
      let toastId = null;
      useToast && (toastId = toast.loading("Loading..."));

      setReqState({ error: null, data: null, loading: true, status: null });
      try {
        const json = await apiCall(...data);
        await setReqState({
          error: null,
          data: json?.data ?? null,
          loading: false,
          status: json?.status,
        });

        if (useToast && toastId) {
          const timeId = setTimeout(() => {
            toast.dismiss(toastId);
            resolve({
              error: null,
              data: json?.data ?? null,
              loading: false,
              status: json.status,
            });
          }, 500);

          return () => clearTimeout(timeId);
        }

        resolve({
          error: null,
          data: json?.data ?? null,
          loading: false,
          status: json.status,
        });
      } catch (e) {
        const message =
          (e.response && e.response.data) || "Ooops, something went wrong...";
        await setReqState({
          error: message,
          data: null,
          loading: false,
          status: e.state,
        });
        reject({ error: message, data: null, loading: false, status: e.state });
      }
    });
  };

  return [handler, { ...reqState }];
}
