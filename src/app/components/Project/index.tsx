import { IResponseGetProject } from "@/shared/interfaces";
import SpotlightCard from "@/shared/ui/components/SpotlightCard";
import { NextPage } from "next";
import Link from "next/link";

async function getProjects(): Promise<IResponseGetProject[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/projects`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function ProjectSection() {
  const projects = await getProjects();

  return (
    <div id="projects" className="flex w-full items-center flex-col gap-5">
      <h2 className="flex w-full h-6 items-center justify-center text-center font-bold text-white text-2xl">
        MY PROJECT
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {projects?.map((project: IResponseGetProject, idx: number) => (
          <Link key={idx} href={project?.link}>
            <SpotlightCard
              key={project?.id}
              className="custom-spotlight-card rounded-md p-4 flex flex-col items-center text-center shadow-md"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <div
                className="w-full h-40 bg-cover bg-center rounded-md border border-white"
                style={{ backgroundImage: `url(${project?.image})` }}
              />
              <h3 className="mt-4 text-lg font-semibold">{project?.title}</h3>
              <p className="text-sm text-gray-300">{project?.description}</p>
            </SpotlightCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
