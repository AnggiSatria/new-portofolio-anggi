"use client";

import { IResponseGetProject } from "@/shared/interfaces";
import { useReadExperiences } from "@/shared/service/experiences/hooks";
import { useReadProjects } from "@/shared/service/projects";
import { useActiveIndexStore } from "@/shared/store/decisionState";
import GooeyNav from "@/shared/ui/components/GooeyNav/GooeyNav";
import SpotlightCard from "@/shared/ui/components/SpotlightCard";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import moment from "moment";

export default function ProjectSection() {
  const { data: dataProject, isLoading: loadingProject } = useReadProjects();
  const { data: experienceData, isLoading: loadingExperience } =
    useReadExperiences();
  const { activeDecision } = useActiveIndexStore();

  const projects = dataProject?.data;
  const experience = experienceData?.data;

  const items = [
    { label: "Experience", href: "#experience", value: "experience" },
    { label: "Project", href: "#projects", value: "projects" },
  ];

  const hastag = items?.[activeDecision]?.value;

  const loadingSkeleton = [1, 2, 3, 4];

  const sortedData = experience?.sort(
    (a: any, b: any) =>
      moment(a.startDate).valueOf() - moment(b.startDate).valueOf()
  );

  const getDurationLabel = (startDate: string, endDate: string | null) => {
    if (endDate) {
      const duration = moment.duration(moment(endDate).diff(moment(startDate)));
      const years = duration.years();
      const months = duration.months();

      // Format: "2 yrs 3 mos"
      let label = "";
      if (years > 0) label += `${years} yr${years > 1 ? "s" : ""} `;
      if (months > 0) label += `${months} mo${months > 1 ? "s" : ""}`;
      return label.trim();
    } else {
      return `(${moment(startDate).fromNow()})`;
    }
  };

  return (
    <div id={hastag} className="flex w-full items-center flex-col gap-5">
      <div className="flex w-full h-10 items-center justify-center text-center">
        <GooeyNav
          items={items}
          animationTime={600}
          pCount={15}
          minDistance={20}
          maxDistance={42}
          maxRotate={75}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          timeVariance={300}
        />
      </div>
      {hastag === "experience" ? (
        <div className="flex w-11/12 gap-5 flex-col">
          {loadingExperience
            ? loadingSkeleton?.map((idx: number) => {
                return (
                  <div
                    key={idx}
                    className="flex w-full bg-white rounded-md shadow-md gap-5 p-5"
                  >
                    <Skeleton className="flex w-20 xl:w-1/12 rounded-md h-20 bg-[#ccc] shadow-md" />

                    <div className="flex w-11/12 rounded-md flex-col gap-1.5">
                      <Skeleton className="text-black flex w-full items-center h-6 text-base font-semibold" />
                      <Skeleton className="flex w-full items-center h-5 text-black" />

                      <Skeleton className="flex w-full items-center h-4 text-black" />

                      <Skeleton className="flex w-full text-black flex-col items-start" />
                    </div>
                  </div>
                );
              })
            : sortedData?.map((res: any, idx: number) => {
                return (
                  <div
                    key={idx}
                    className="flex w-full bg-white rounded-md shadow-md gap-5 p-5"
                  >
                    <div className="flex w-20 xl:w-1/12 rounded-md h-20 bg-[#ccc] shadow-md">
                      <Image
                        src="/assets/company-not-found.png"
                        layout="responsive"
                        width={80}
                        height={80}
                        alt="img-job"
                        className="w-full h-full rounded-md object-cover"
                      />
                    </div>
                    <div className="flex w-11/12 rounded-md flex-col gap-1.5">
                      <div className="text-black flex w-full items-center h-6 text-base font-semibold">
                        {res?.title}
                      </div>
                      <div className="flex w-full items-center h-5 text-black">
                        {res?.company}
                      </div>
                      <div className="flex w-full items-center h-4 text-black">
                        {`${moment(res?.startDate).format("MMM YYYY")} - ${
                          res?.endDate === null
                            ? "Now"
                            : moment(res?.endDate).format("MMM YYYY")
                        }`}{" "}
                        {getDurationLabel(res?.startDate, res?.endDate)}
                      </div>

                      <div
                        className="flex w-full text-black flex-col items-start"
                        dangerouslySetInnerHTML={{ __html: res?.description }}
                      />
                    </div>
                  </div>
                );
              })}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {loadingProject
            ? loadingSkeleton?.map((idx: number) => (
                <div
                  key={idx}
                  className="rounded-md p-4 flex flex-col items-center text-center shadow-md h-full border border-white"
                >
                  <Skeleton className="w-full h-40 border border-white" />
                  <Skeleton className="w-full mt-4 text-lg font-semibold" />
                  <Skeleton className="w-full text-sm text-gray-300" />
                </div>
              ))
            : projects?.map((project: IResponseGetProject, idx: number) => (
                <Link key={idx} href={project?.link}>
                  <SpotlightCard
                    key={project?.id}
                    className="custom-spotlight-card rounded-md p-4 flex flex-col items-center text-center shadow-md h-full"
                    spotlightColor="rgba(0, 229, 255, 0.2)"
                  >
                    <div
                      className="w-full h-40 bg-cover bg-center rounded-md border border-white"
                      style={{ backgroundImage: `url(${project?.image})` }}
                    />
                    <h3 className="mt-4 text-lg font-semibold">
                      {project?.title}
                    </h3>
                    <p className="text-sm text-gray-300">
                      {project?.description}
                    </p>
                  </SpotlightCard>
                </Link>
              ))}
        </div>
      )}
    </div>
  );
}
