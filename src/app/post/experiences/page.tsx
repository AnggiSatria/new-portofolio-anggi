"use client";

import { useState } from "react";
import {
  useCreateExperience,
  useDeletedExperience,
  useReadExperiences,
} from "@/shared/service/experiences/hooks";
import MyEditor from "@/shared/ui/components/MyEditor";

export default function Home() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const { data: experienceData, refetch: refetchExperiences } =
    useReadExperiences();
  const { mutations } = useCreateExperience();
  const { mutations: deleteExperience } = useDeletedExperience();

  const experiences = experienceData?.data;

  const handleSubmit = async () => {
    mutations.mutateAsync(form).then(() => {
      refetchExperiences();
    });

    setForm({
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  const handleDelete = async (id: any) => {
    deleteExperience
      .mutateAsync(id)
      .then(() => {
        refetchExperiences();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">My Experiences</h1>

      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        placeholder="company"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
        className="w-full p-2 border rounded"
      />

      <div className="flex w-full grid-cols-2 gap-1.5">
        <input
          type="date"
          placeholder="startDate"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          className="w-full p-2 border rounded"
        />

        <input
          type="date"
          placeholder="endDate"
          value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>

      <MyEditor
        value={form.description}
        onChange={(value) => setForm({ ...form, description: value })}
      />

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Experience
      </button>

      <div className="space-y-4 mt-6">
        {experiences?.map((p: any) => (
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

            <h2 className="text-xl font-semibold mt-2">{p?.title}</h2>
            <h2 className="text-xl font-semibold mt-2">{p?.company}</h2>
            <div dangerouslySetInnerHTML={{ __html: p?.description }} />
          </div>
        ))}
      </div>
    </div>
  );
}
