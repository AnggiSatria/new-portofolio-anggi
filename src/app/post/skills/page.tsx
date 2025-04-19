"use client";

import { useState } from "react";
import Image from "next/image";
import {
  useCreateSkill,
  useDeletedSkill,
  useReadSkills,
} from "@/shared/service/skills";

export default function Home() {
  const [form, setForm] = useState({
    image: "",
  });

  const { data: skillData, refetch: refetchSkills } = useReadSkills();
  const { mutations } = useCreateSkill();
  const { mutations: deleteSkill } = useDeletedSkill();

  const skills = skillData?.data;

  const handleSubmit = async () => {
    mutations.mutateAsync(form).then(() => {
      refetchSkills();
    });

    setForm({ image: "" });
  };

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

  const handleDelete = async (id: any) => {
    deleteSkill
      .mutateAsync(id)
      .then(() => {
        refetchSkills();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">My Skills</h1>

      <input type="file" accept="image/*" onChange={handleFileChange} />

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Skills
      </button>

      <div className="space-y-4 mt-6">
        {skills?.map((p: any) => (
          <div key={p?.id} className="border rounded p-4">
            <div
              className="flex w-full h-full justify-end mb-5 cursor-pointer"
              onClick={() => handleDelete(p?.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-3 h-3 flex flex-end"
              >
                <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </svg>
            </div>

            <div className="flex h-40">
              <Image
                src={p?.image}
                alt={p?.id}
                width={160}
                height={160}
                className="w-full h-full object-cover rounded"
                layout="responsive"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
