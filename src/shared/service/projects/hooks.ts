import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteProject,
  getProjectById,
  getProjects,
  postProject,
  putProject,
} from "./fetcher";
import { IRequestPostPutProject } from "@/shared/interfaces";

export const createProject = () => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestPostPutProject) => postProject(payload),
    mutationKey: ["post-project"],
  });

  return { mutations };
};

export const readProjects = () => {
  return useQuery({
    queryKey: ["read-projects"],
    queryFn: async () => await getProjects(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const readProjectById = (id: any) => {
  return useQuery({
    queryKey: ["read-project-by-id", id],
    queryFn: async () => await getProjectById(id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const updatedProject = () => {
  const mutations = useMutation({
    mutationFn: async ({
      payload,
      id,
    }: {
      payload: IRequestPostPutProject;
      id: string;
    }) => putProject({ payload, id }),
    mutationKey: ["update-project"],
  });

  return { mutations };
};

export const deletedProject = () => {
  const mutations = useMutation({
    mutationFn: async (payload: string) => deleteProject(payload),
    mutationKey: ["deleted-project"],
  });

  return { mutations };
};
