import {
  IRequestCertificatePost,
  IRequestCertificatePut,
} from "@/shared/interfaces";
import axios from "axios";

export const postCertificate = (payload: IRequestCertificatePost) => {
  return axios.post(`/api/certificate`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getCertificate = () => {
  return axios.get("/api/certificate");
};

export const getCertificateById = (id: string) => {
  return axios.get(`/api/certificate?id=${id}`);
};

export const putCertificate = ({
  payload,
  id,
}: {
  payload: IRequestCertificatePut;
  id: string;
}) => {
  return axios.put(`/api/certificate?id=${id}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const deleteCertificate = (id: string) => {
  return axios.delete(`/api/certificate?id=${id}`);
};
