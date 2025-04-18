import { IRequestPostPutProject } from "@/shared/interfaces";
import axios from "axios";

export const postProject = (payload: IRequestPostPutProject) => {
  return axios.post(`/api/projects`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getProjects = () => {
  return axios.get("/api/projects");
};

export const getProjectById = (id: string) => {
  return axios.get(`/api/projects/${id}`);
};

export const putProject = ({
  payload,
  id,
}: {
  payload: IRequestPostPutProject;
  id: string;
}) => {
  return axios.put(`/api/projects/${id}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteProject = (id: string) => {
  return axios.delete(`/api/projects/${id}`);
};
