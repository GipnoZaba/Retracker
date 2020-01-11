import axios, { AxiosResponse } from "axios";
import { IAppTask } from "../models/appTask";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(undefined, error => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error - API does not respond.");
  }

  const { status, data, config } = error.response;

  if (status === 404) {
    //history.push("/notfound");
  }

  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    //history.push("/notfound");
  }

  if (status === 500) {
    toast.error("Server error - check the terminal for more info.");
  }

  throw error;
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody)
};

const AppTasks = {
  list: (): Promise<IAppTask[]> => requests.get("/apptasks"),
  create: (appTask: IAppTask) => requests.post("/apptasks", appTask),
  details: (id: string) => requests.get(`/apptasks/${id}`),
  edit: (appTask: IAppTask) => requests.put(`/apptasks/${appTask.id}`, appTask),
  delete: (id: string) => requests.del(`/apptasks/${id}`)
};

export default {
  AppTasks
};
