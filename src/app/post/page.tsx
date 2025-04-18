"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  createProject,
  deletedProject,
  readProjects,
} from "@/shared/service/projects";

export default function Home() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
  });

  const { data: projectData, refetch: refetchProject } = readProjects();
  const { mutations } = createProject();
  const { mutations: deleteProject } = deletedProject();

  const projects = projectData?.data;

  const handleSubmit = async () => {
    mutations.mutateAsync(form).then(() => {
      refetchProject();
    });

    setForm({ title: "", description: "", image: "", link: "" });
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
    deleteProject
      .mutateAsync(id)
      .then(() => {
        refetchProject();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">My Projects</h1>

      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="url"
        placeholder="Link (GitHub or Live)"
        value={form.link}
        onChange={(e) => setForm({ ...form, link: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input type="file" accept="image/*" onChange={handleFileChange} />

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Add Project
      </button>

      <div className="space-y-4 mt-6">
        {projects?.map((p: any) => (
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

            <img
              src={p?.image}
              alt={p?.title}
              className="w-full h-40 object-cover rounded"
            />
            <h2 className="text-xl font-semibold mt-2">{p?.title}</h2>
            <p>{p.description}</p>
            <a
              href={p?.link}
              target="_blank"
              className="text-blue-500 underline"
            >
              Visit
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
