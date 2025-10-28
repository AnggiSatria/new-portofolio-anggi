"use client";

import { useState } from "react";

import Image from "next/image";
import {
  useCreateCertificate,
  useDeletedCertificate,
  useReadCertificate,
} from "@/shared/service/certificate";

export default function CertificatePage() {
  const [form, setForm] = useState({
    title: "",
    issuer: "",
    issueDate: "",
    image: "",
  });

  const { data: certificateData, refetch: refetchCertificates } =
    useReadCertificate();
  const { mutations: createCertificate } = useCreateCertificate();
  const { mutations: deleteCertificate } = useDeletedCertificate();

  const certificates = certificateData?.data || [];

  // ✅ Handle image upload -> convert ke base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Create new certificate
  const handleSubmit = async () => {
    await createCertificate
      .mutateAsync(form)
      .then(() => {
        refetchCertificates();
        setForm({ title: "", issuer: "", issueDate: "", image: "" });
      })
      .catch((err) => console.error(err));
  };

  // ✅ Delete certificate
  const handleDelete = async (id: string) => {
    await deleteCertificate
      .mutateAsync(id)
      .then(() => {
        refetchCertificates();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold ">Certificates</h1>

      {/* Form */}
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full p-2 border rounded bg-transparent "
      />
      <input
        type="text"
        placeholder="Issuer"
        value={form.issuer}
        onChange={(e) => setForm({ ...form, issuer: e.target.value })}
        className="w-full p-2 border rounded bg-transparent "
      />
      <input
        type="date"
        value={form.issueDate}
        onChange={(e) => setForm({ ...form, issueDate: e.target.value })}
        className="w-full p-2 border rounded bg-transparent "
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className=""
      />

      <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600  rounded">
        Add Certificate
      </button>

      {/* List */}
      <div className="space-y-4 mt-6">
        {certificates.map((c: any) => (
          <div key={c.id} className="border rounded p-4 ">
            <div
              className="flex justify-end mb-3 cursor-pointer"
              onClick={() => handleDelete(c.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-4 h-4"
                fill="white"
              >
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-96l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32l21.2 339c1.6 25.3 22.6 45 47.9 45h245.8c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </svg>
            </div>

            {c.image && (
              <div className="w-full h-40 relative">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
            )}
            <h2 className="text-lg font-semibold mt-2">{c.title}</h2>
            <p className="text-sm">{c.issuer}</p>
            <p className="text-xs text-gray-400">
              Issued on: {new Date(c.issueDate).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
