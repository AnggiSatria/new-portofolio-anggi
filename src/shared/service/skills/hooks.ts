import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteSkills, getSkills, postSkill } from "./fetcher";
import { IRequestPostSkill } from "@/shared/interfaces";

export const useCreateSkill = () => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestPostSkill) => postSkill(payload),
    mutationKey: ["post-skill"],
  });

  return { mutations };
};

export const useReadSkills = () => {
  return useQuery({
    queryKey: ["read-skills"],
    queryFn: async () => await getSkills(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useDeletedSkill = () => {
  const mutations = useMutation({
    mutationFn: async (payload: string) => deleteSkills(payload),
    mutationKey: ["deleted-skill"],
  });

  return { mutations };
};
