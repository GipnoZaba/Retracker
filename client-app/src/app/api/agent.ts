import axios, { AxiosResponse } from "axios";
import { IAppTask, IAppTaskFormValues } from "../models/appTask";
import { toast } from "react-toastify";
import { IUser, IUserFormValues } from "../models/user";
import { history } from "../..";
import { IProject, IProjectFormValues, IProjectTaskFormValues, IProjectList, IProjectTask, IProjectListFormValues } from "../models/project";

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

/*
const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>(resolve =>
    setTimeout(() => resolve(response), ms)
  );
*/

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  patch: (url: string, body: {}) => axios.patch(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody)
};

const User = {
  register: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/users/register`, user),
  login: (user: IUserFormValues): Promise<IUser> =>
    requests.post(`/users/login`, user),
  current: (): Promise<IUser> => requests.get("/users")
};

const AppTasks = {
  list: (): Promise<IAppTask[]> => requests.get("/apptasks"),
  create: (appTask: IAppTaskFormValues) => requests.post("/apptasks", appTask),
  details: (id: string): Promise<IAppTask> => requests.get(`/apptasks/${id}`),
  edit: (appTask: IAppTaskFormValues) =>
    requests.put(`/apptasks/${appTask.id}`, appTask),
  complete: (id: string) => requests.patch(`/apptasks/${id}/complete`, {}),
  restore: (id: string) => requests.patch(`/apptasks/${id}/restore`, {}),
  delete: (id: string) => requests.del(`/apptasks/${id}`)
};

const Projects = {
  list: (): Promise<IProject[]> => requests.get("/projects"),
  create: (project: IProjectFormValues) => requests.post("/projects", project),
  details: (id: string): Promise<IProject> => requests.get(`/projects/${id}`),
  edit: (project: IProjectFormValues) =>
    requests.put(`/apptasks/${project.id}`, project),
  delete: (id: string) => requests.del(`/projects/${id}`)
};

const ProjectLists = {
  create: (projectList: IProjectListFormValues) => requests.post("/projects/lists", projectList),
  details: (id: string): Promise<IProjectList> => requests.get(`/projects/lists/${id}`),
  edit: (projectList: IProjectListFormValues) => requests.put(`/projects/lists/${projectList.id}`, projectList),
  delete: (id: string) => requests.del(`/projects/lists/${id}`)
}

const ProjectTasks = {
  create: (projectTask: IProjectTaskFormValues) => requests.post("/projects/lists/tasks", projectTask),
  details: (id: string): Promise<IProjectTask> => requests.get(`/projects/lists/tasks/${id}`),
  edit: (projectTask: IProjectTaskFormValues) => requests.put(`/projects/lists/tasks/${projectTask.id}`, projectTask),
  complete: (id: string) => requests.patch(`/projects/lists/tasks/${id}/complete`, {}),
  restore: (id: string) => requests.patch(`/projects/lists/tasks/${id}/restore`, {}),
  delete: (id: string) => requests.del(`/projects/lists/tasks/${id}`)
}

export default {
  AppTasks,
  User,
  Projects,
  ProjectLists,
  ProjectTasks
};
