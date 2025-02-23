import SpotlightCard from "@/shared/ui/components/SpotlightCard";
import { NextPage } from "next";

interface Props {}

const ProjectSection: NextPage<Props> = ({}) => {
  const projects = [
    {
      id: 1,
      title: "Dumbmerch",
      description: "A Next.js and Tailwind CSS project with modern UI.",
      image: "/images/project1.jpg",
    },
    {
      id: 2,
      title: "Waysbook",
      description: "Building a scalable React application with best practices.",
      image: "/images/project2.jpg",
    },
    {
      id: 3,
      title: "Dumbsound",
      description: "A fully responsive and interactive web experience.",
      image: "/images/project3.jpg",
    },
    {
      id: 4,
      title: "Tanri Abeng Apps",
      description: "Next.js App Router implementation with animations.",
      image: "/images/project4.jpg",
    },
  ];

  return (
    <div id="projects" className="flex w-full items-center flex-col gap-5">
      <h2 className="flex w-full h-6 items-center justify-center text-center font-bold text-white text-2xl">
        MY PROJECT
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {projects?.map((project) => (
          <SpotlightCard
            key={project.id}
            className="custom-spotlight-card rounded-md p-4 flex flex-col items-center text-center shadow-md"
            spotlightColor="rgba(0, 229, 255, 0.2)"
          >
            <div
              className="w-full h-40 bg-cover bg-center rounded-md border border-white"
              style={{ backgroundImage: `url(${project.image})` }}
            />
            <h3 className="mt-4 text-lg font-semibold">{project.title}</h3>
            <p className="text-sm text-gray-300">{project.description}</p>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
};

export default ProjectSection;
