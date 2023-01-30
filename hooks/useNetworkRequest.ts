import { UserContext } from "../components/ContextWrapper";
import { IPayload } from "../models/payload";
import getConfig from "next/config";
const { publicRuntimeConfig: config } = getConfig();

function useNetworkRequest() {
  const { setUserCredentials, userCredentials } = UserContext();
  const { userId, token } = userCredentials;
  const requests = {
    async getItems(endpoint: string, body?: object) {
      return await fetch(
        `http://${config?.hostname || "localhost"}:8080${endpoint}`,
        {
          body: JSON.stringify({ id: userId, ...body }),
          headers: {
            "auth-token": token,
          },
        }
      ).then((r) => r.json());
    },

    //Although its called get blood pressure, is technically a post as we are sending data.
    async getBloodPressureRecords() {
      try {
        const bPRecords = await requests
          .postItem("/api/post/getBloodPressure", {
            customPayload: {
              startDate: userCredentials?.userDetails?.dateRange?.startDate,
              endDate: userCredentials?.userDetails?.dateRange.endDate,
            },
            formPayload: null,
            headers: {
              "auth-token": token,
              "content-type": "application/json",
              id: userId,
            },
          })
          .then((r) => r.json());
        setUserCredentials((state) => ({ ...state, ...bPRecords }));
      } catch (e) {
        throw new Error(e as string);
      }
    },

    async updateBloodPressureRecords(formPayload: FormData) {
      const response = await requests.putItem("/api/put/updateBloodPressure", {
        customPayload: null,
        formPayload,
        headers: {
          "auth-token": token,
          id: userId,
        },
      });
      requests.getBloodPressureRecords();
      return response;
    },

    async postItem(endpoint: string, payload: IPayload) {
      return await fetch(
        `http://${config?.hostname || "localhost"}:8080${endpoint}`,
        {
          method: "POST",
          body: payload.formPayload || JSON.stringify(payload.customPayload),
          headers: payload.headers,
        }
      ).then((r) => r);
    },

    async register(formPayload: FormData) {
      return await requests.postItem("/api/post/register", {
        formPayload,
        customPayload: null,
        headers: {},
      });
    },

    async addBloodPressureRecord(formPayload: FormData) {
      const response = await requests.postItem("/api/post/addBloodPressure", {
        customPayload: null,
        formPayload,
        headers: {
          "auth-token": token,
          id: userId,
        },
      });
      requests.getBloodPressureRecords();
      return response;
    },

    async login(formPayload: FormData) {
      const response = await requests.postItem("/api/post/login", {
        formPayload,
        customPayload: null,
        headers: {},
      });

      try {
        const userObject = await response.json();

        userObject.userDetails.dateRange = {
          startDate: userObject.userDetails.date,
          endDate: new Date(),
        };

        setUserCredentials({
          ...userObject,
        });

        return response;
      } catch (e) {
        return response;
      }
    },

    async putItem(endpoint: string, payload: IPayload) {
      return await fetch(
        `http://${config?.hostname || "localhost"}:8080${endpoint}`,
        {
          method: "PUT",
          body: payload.formPayload || JSON.stringify(payload.customPayload),
          headers: payload.headers,
        }
      ).then((r) => r);
    },

    async deleteBloodPressureRecord(id: string) {
      const response = await requests.deleteItem(
        "/api/delete/deleteBloodPressure",
        { id }
      );
      requests.getBloodPressureRecords();
      return response;
    },

    async deleteItem(endpoint: string, payload: { id: string }) {
      return await fetch(
        `http://${config?.hostname || "localhost"}:8080${endpoint}`,
        {
          method: "DELETE",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
            id: userId,
          },
        }
      ).then((r) => r);
    },
  };

  return requests;
}

export default useNetworkRequest;
