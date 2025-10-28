import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteEducation,
  getEducation,
  getEducationById,
  postEducation,
  putEducation,
} from "./fetcher";
import {
  IRequestEducationPost,
  IRequestEducationPut,
} from "@/shared/interfaces";

export const useCreateEducation = () => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestEducationPost) =>
      postEducation(payload),
    mutationKey: ["post-education"],
  });

  return { mutations };
};

export const useReadEducation = () => {
  return useQuery({
    queryKey: ["read-education"],
    queryFn: async () => await getEducation(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useReadEducationById = (id: any) => {
  return useQuery({
    queryKey: ["read-education-by-id", id],
    queryFn: async () => await getEducationById(id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useUpdatedEducation = () => {
  const mutations = useMutation({
    mutationFn: async ({
      payload,
      id,
    }: {
      payload: IRequestEducationPut;
      id: string;
    }) => putEducation({ payload, id }),
    mutationKey: ["update-education"],
  });

  return { mutations };
};

export const useDeletedEducation = () => {
  const mutations = useMutation({
    mutationFn: async (payload: string) => deleteEducation(payload),
    mutationKey: ["deleted-education"],
  });

  return { mutations };
};
