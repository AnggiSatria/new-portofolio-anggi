import { useMutation, useQuery } from "@tanstack/react-query";

import { IRequestPostPutExperience } from "@/shared/interfaces";
import {
  deleteExperience,
  getExperience,
  getExperienceById,
  postExperience,
  putExperience,
} from "./fetcher";

export const useCreateExperience = () => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestPostPutExperience) =>
      postExperience(payload),
    mutationKey: ["post-experience"],
  });

  return { mutations };
};

export const useReadExperiences = () => {
  return useQuery({
    queryKey: ["read-experiences"],
    queryFn: async () => await getExperience(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useReadExperienceById = (id: any) => {
  return useQuery({
    queryKey: ["read-experience-by-id", id],
    queryFn: async () => await getExperienceById(id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useUpdatedExperience = () => {
  const mutations = useMutation({
    mutationFn: async ({
      payload,
      id,
    }: {
      payload: IRequestPostPutExperience;
      id: string;
    }) => putExperience({ payload, id }),
    mutationKey: ["update-experience"],
  });

  return { mutations };
};

export const useDeletedExperience = () => {
  const mutations = useMutation({
    mutationFn: async (payload: string) => deleteExperience(payload),
    mutationKey: ["deleted-experience"],
  });

  return { mutations };
};
