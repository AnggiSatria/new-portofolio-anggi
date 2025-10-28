import {
  IRequestEducationPost,
  IRequestEducationPut,
} from "@/shared/interfaces";
import axios from "axios";

export const postEducation = (payload: IRequestEducationPost) => {
  return axios.post(`/api/education`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getEducation = () => {
  return axios.get("/api/education");
};

export const getEducationById = (id: string) => {
  return axios.get(`/api/education?id=${id}`);
};

export const putEducation = ({
  payload,
  id,
}: {
  payload: IRequestEducationPut;
  id: string;
}) => {
  return axios.put(`/api/education?id=${id}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteEducation = (id: string) => {
  return axios.delete(`/api/education?id=${id}`);
};
