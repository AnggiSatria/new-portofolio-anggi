import {
  IRequestPostPutExperience,
  IRequestPostPutProject,
} from "@/shared/interfaces";
import axios from "axios";

export const postExperience = (payload: IRequestPostPutProject) => {
  return axios.post(`/api/experience`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getExperience = () => {
  return axios.get("/api/experience");
};

export const getExperienceById = (id: string) => {
  return axios.get(`/api/experience?id=${id}`);
};

export const putExperience = ({
  payload,
  id,
}: {
  payload: IRequestPostPutExperience;
  id: string;
}) => {
  return axios.put(`/api/experience?id=${id}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteExperience = (id: string) => {
  return axios.delete(`/api/experience?id=${id}`);
};
