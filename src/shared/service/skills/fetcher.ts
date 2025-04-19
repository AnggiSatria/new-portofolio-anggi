import { IRequestPostSkill } from "@/shared/interfaces";
import axios from "axios";

export const postSkill = (payload: IRequestPostSkill) => {
  return axios.post(`/api/skills`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getSkills = () => {
  return axios.get("/api/skills");
};

export const deleteSkills = (id: string) => {
  return axios.delete(`/api/skills?id=${id}`);
};
