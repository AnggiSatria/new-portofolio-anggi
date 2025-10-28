"use client";

import { useState } from "react";
import {
  useCreateEducation,
  useDeletedEducation,
  useReadEducation,
} from "@/shared/service/education/hooks";

export default function EducationPage() {
  const [form, setForm] = useState({
    institution: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
  });

  const { data: educationData, refetch: refetchEducation } = useReadEducation();
  const { mutations: createEducation } = useCreateEducation();
  const { mutations: deleteEducation } = useDeletedEducation();

  const educationList = educationData?.data;

  const handleSubmit = async () => {
    if (!form.institution || !form.degree || !form.field || !form.startDate) {
      alert("Please fill in all required fields.");
      return;
    }

    await createEducation
      .mutateAsync(form)
      .then(() => {
        refetchEducation();
        setForm({
          institution: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
        });
      })
      .catch((err) => console.error("Error creating education:", err));
  };

  const handleDelete = async (id: string) => {
    await deleteEducation
      .mutateAsync(id)
      .then(() => {
        refetchEducation();
      })
      .catch((err) => console.error("Error deleting education:", err));
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Education History</h1>

      {/* Institution */}
      <input
        type="text"
        placeholder="Institution"
        value={form.institution}
        onChange={(e) => setForm({ ...form, institution: e.target.value })}
        className="w-full p-2 border rounded"
      />

      {/* Degree */}
      <input
        type="text"
        placeholder="Degree"
        value={form.degree}
        onChange={(e) => setForm({ ...form, degree: e.target.value })}
        className="w-full p-2 border rounded"
      />

      {/* Field of Study */}
      <input
        type="text"
        placeholder="Field of Study"
        value={form.field}
        onChange={(e) => setForm({ ...form, field: e.target.value })}
        className="w-full p-2 border rounded"
      />

      {/* Dates */}
      <div className="flex w-full grid-cols-2 gap-1.5">
        <input
          type="date"
          placeholder="Start Date"
          value={form.startDate}
          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          className="w-full p-2 border rounded"
        />

        <input
          type="date"
          placeholder="End Date (optional)"
          value={form.endDate}
          onChange={(e) => setForm({ ...form, endDate: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Button */}
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Education
      </button>

      {/* Education List */}
      <div className="space-y-4 mt-6">
        {educationList?.map((edu: any) => (
          <div key={edu.id} className="border rounded p-4">
            <div
              className="flex w-full justify-end mb-5 cursor-pointer"
              onClick={() => handleDelete(edu.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-3 h-3 flex flex-end"
              >
                <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
              </svg>
            </div>

            <h2 className="text-lg font-semibold">{edu.institution}</h2>
            <p className="text-sm italic">{edu.degree}</p>
            <p className="text-sm">{edu.field}</p>

            <p className="text-xs text-gray-500 mt-2">
              {new Date(edu.startDate).toLocaleDateString()}{" "}
              {edu.endDate
                ? ` - ${new Date(edu.endDate).toLocaleDateString()}`
                : "- Present"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
