import axios, { AxiosResponse } from "axios";
import { IAppTask } from "../models/appTask";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/user";
import { history } from "../..";
import { wait } from "@testing-library/react";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem("jwt");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, error => {
  if (error.message === "Network Error" && !error.response) {
    toast.error("Network error - API does not respond.");
  }

  const { status, data, config } = error.response;

  if (status === 404) {
    history.push("/notfound");
  }

  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }

  if (status === 500) {
    toast.error("Server error - check the terminal for more info.");
  }

  throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) =>
    axios
      .get(url)
      .then(sleep(1000))
      .then(responseBody),
  post: (url: string, body: {}) =>
    axios
      .post(url, body)
      .then(sleep(1000))
      .then(responseBody),
  put: (url: string, body: {}) =>
    axios
      .put(url, body)
      .then(sleep(1000))
      .then(responseBody),
  del: (url: string) =>
    axios
      .delete(url)
      .then(sleep(1000))
      .then(responseBody)
};

const AppTasks = {
  list: (): Promise<IAppTask[]> => requests.get("/apptasks"),
  create: (appTask: IAppTask) => requests.post("/apptasks", appTask),
  details: (id: string) => requests.get(`/apptasks/${id}`),
  edit: (appTask: IAppTask) => requests.put(`/apptasks/${appTask.id}`, appTask),
  delete: (id: string) => requests.del(`/apptasks/${id}`)
};

const User = {
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/users/register`, user),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/users/login`, user),
  current: (): Promise<IUser> => requests.get("/users")
};

export default {
  AppTasks,
  User
};
