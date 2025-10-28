import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteCertificate,
  getCertificate,
  getCertificateById,
  postCertificate,
  putCertificate,
} from "./fetcher";
import {
  IRequestCertificatePost,
  IRequestCertificatePut,
} from "@/shared/interfaces";

export const useCreateCertificate = () => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestCertificatePost) =>
      postCertificate(payload),
    mutationKey: ["post-certificate"],
  });

  return { mutations };
};

export const useReadCertificate = () => {
  return useQuery({
    queryKey: ["read-certificate"],
    queryFn: async () => await getCertificate(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useReadCertificateById = (id: any) => {
  return useQuery({
    queryKey: ["read-certificate-by-id", id],
    queryFn: async () => await getCertificateById(id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useUpdatedCertificate = () => {
  const mutations = useMutation({
    mutationFn: async ({
      payload,
      id,
    }: {
      payload: IRequestCertificatePut;
      id: string;
    }) => putCertificate({ payload, id }),
    mutationKey: ["update-certificate"],
  });

  return { mutations };
};

export const useDeletedCertificate = () => {
  const mutations = useMutation({
    mutationFn: async (payload: string) => deleteCertificate(payload),
    mutationKey: ["deleted-certificate"],
  });

  return { mutations };
};
