import { useState } from "react";

const ManageStatus = () => {
  const [responseStatus, setResponseStatus] = useState({
    loading: false,
    fail: false,
    success: false,
  });

  const status = {
    responseStatus,

    async handleNetworkResponse(
      requestFunction: (payload: FormData) => Promise<Response>,
      payload: FormData
    ) {
      status.startLoading();
      const response = await requestFunction(payload);
      if (response.ok === true) {
        status.requestSuccessful();
      } else {
        status.requestFailed();
      }
    },

    startLoading() {
      setResponseStatus({ loading: true, fail: false, success: false });
    },

    requestSuccessful() {
      setResponseStatus({ loading: false, fail: false, success: true });
    },

    requestFailed() {
      setResponseStatus({ loading: false, fail: true, success: false });
    },
  };

  return status;
};

export default ManageStatus;
