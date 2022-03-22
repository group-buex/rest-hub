import { useState } from "react";
import toast from "react-hot-toast";

type reqState = {
  error: string;
  data: any;
  loading: boolean;
  status: number;
};

// axios post
export function useApiHandler(apiCall, useToast: boolean) {
  const [reqState, setReqState] = useState<reqState>({
    error: null,
    data: null,
    loading: false,
    status: null,
  });

  const handleSuccessHandler = async (json, resolve) => {
    await setReqState({
      error: json?.response?.data?.msg ?? null,
      data: json?.data ?? null,
      loading: false,
      status: json?.status ?? json?.reponse?.status,
    });

    json?.response?.data?.msg && toast.error(json?.response?.data?.msg);

    return resolve({
      error: json?.response?.data?.msg ?? null,
      data: json?.data ?? null,
      loading: false,
      status: json?.status ?? json?.reponse?.status,
    });
  };

  const handleErrorHandler = async (error, reject) => {
    const message =
      (error.response && error.response.data) ||
      "Ooooooops, something went wrong...";

    await setReqState({
      error: message,
      data: null,
      loading: false,
      status: error.response.state,
    });

    toast.error(error.message || message);

    return reject({
      error: message,
      data: null,
      loading: false,
      status: error.response.state,
    });
  };

  const handler = async (...data) => {
    const toastId = toast.loading("Loading...");

    return new Promise(async (resolve, reject) => {
      setReqState({ error: null, data: null, loading: true, status: null });

      try {
        const json = await apiCall(...data);

        if (useToast) {
          const timeId = setTimeout(async () => {
            toast.dismiss(toastId);

            handleSuccessHandler(json, resolve);
          }, 500);

          return () => clearTimeout(timeId);
        } else {
          handleSuccessHandler(json, resolve);
        }
      } catch (e) {
        if (useToast) {
          const timeId = setTimeout(async () => {
            toast.dismiss(toastId);
            handleErrorHandler(e, reject);
          }, 300);

          return () => clearTimeout(timeId);
        }

        handleErrorHandler(e, reject);
      }
    });
  };

  return [handler, { ...reqState }];
}
