import axios, { AxiosResponse } from "axios";
import { IAppTask } from "../models/appTask";

axios.defaults.baseURL = "http://localhost:5000/api";

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
