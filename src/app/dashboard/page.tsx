"use client";
import Image from "next/image";
import React from "react";
import GooeyNav from "@/shared/ui/components/GooeyNav/GooeyNav";
import DecryptedText from "@/shared/ui/text/DecryptedText";
import { useReadExperiences } from "@/shared/service/experiences/hooks";
import moment from "moment";

export default function Dashboard() {
  const items = [
    { label: "Home", href: "#home", value: "home" },
    { label: "About", href: "#about", value: "about" },
    { label: "Experience", href: "#experience", value: "experience" },
    { label: "Project", href: "#projects", value: "projects" },
    { label: "Exit Dashboard", href: "/", value: "landing-page" },
  ];

  const { data: experienceData, isLoading: loadingExperience } =
    useReadExperiences();
  const experience = experienceData?.data;

  console.log(experience);

  const getDurationLabel = (startDate: string, endDate: string | null) => {
    if (endDate) {
      const duration = moment.duration(moment(endDate).diff(moment(startDate)));
      const years = duration.years();
      const months = duration.months();

      let label = "";
      if (years > 0) label += `${years} yr${years > 1 ? "s" : ""} `;
      if (months > 0) label += `${months} mo${months > 1 ? "s" : ""}`;
      return label.trim();
    } else {
      return `(${moment(startDate).fromNow()})`;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#534F4F] to-[#1D1A1A] inline-flex relative justify-center">
      <div className="inline-flex flex-col md:absolute mt-5 md:top-14 w-full md:w-10/12 xl:w-[1080px] min-h-[608px] grid-flow-row lg:px-0 px-5 gap-5 md:flex-row">
        <div className="w-full md:w-1/4 h-32 md:h-[640px] rounded-md bg-[#0A0A0A] shadow-md py-7 px-5">
          <div className="flex w-full min-h-32 justify-center items-center flex-col gap-3">
            <div className="flex w-fit rounded-full border-2 border-white h-full justify-center">
              <Image
                src="/assets/gw.jpg"
                alt="Profile Picture"
                width={128}
                height={128}
                className="object-cover shadow-md rounded-full"
              />
            </div>

            <div className="flex flex-col justify-center gap-1.5">
              <h1 className="text-xl font-semibold text-white text-center h-5 items-center flex justify-center">
                Anggi Satria
              </h1>
              <p className="text-xs text-gray-300 h-5 items-center flex justify-center">
                Frontend Developer | React & Next.js
              </p>
            </div>

            <div className="flex w-full border border-[#787777]"></div>

            <div className="flex w-full">
              <GooeyNav
                items={items}
                animationTime={600}
                pCount={15}
                minDistance={20}
                maxDistance={42}
                maxRotate={75}
                colors={[1, 2, 3, 1, 2, 3, 1, 4]}
                timeVariance={300}
                isDashboard
              />
            </div>

            <div className="flex w-full">
              <div className="flex w-full flex-col gap-3">
                <div className="flex"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="inline-flex w-full md:w-3/4 h-32 md:h-[640px] shadow-md text-white flex-col gap-5">
          <div className="inline-flex w-full h-fit bg-[#0A0A0A] rounded-md flex-col gap-3 p-5">
            <h1 className="flex w-full h-10 text-2xl items-center font-bold">
              Hi, Welcome to My Dashboard
            </h1>
            <div className="flex w-full h-fit gap-3">
              <DecryptedText
                text="I’m a Frontend Developer with strong experience in React.js and Next.js, focusing on building performant, scalable, and maintainable web applications.I’ve worked with modern frontend stacks including TanStack Query, Zustand, and Redux for state and data management, and have implemented Server-Side Rendering (SSR) and Socket.IO for real-time experiences.I’ve been involved in projects such as Auto2000, handling data-driven UI flows, structured API integration, and optimization for production.At Astra, I worked with Ant Design (AntD) for component design systems, while in other projects, I’ve utilized shadcn/ui and Tailwind CSS to create clean and consistent user interfaces.Beyond frontend, I also have a solid foundation in backend development — particularly in monolithic Express.js applications — giving me a deeper understanding of API design and data flow between the frontend and backend.I’m passionate about creating user-centric, efficient, and visually engaging digital products, and I continuously aim to push both my technical and design boundaries."
                animateOn="view"
                revealDirection="center"
              />
            </div>
          </div>

          <div className="flex w-full overflow-y-auto flex-col gap-5">
            <div className="flex w-full md:sticky top-0 z-10 bg-[#0a0a0a] rounded-md">
              <h2 className="w-full font-bold text-2xl p-3">Carrers</h2>
            </div>

            {experience?.map((res: any, idx: number) => {
              return (
                <div
                  key={idx}
                  className="inline-flex w-full h-fit bg-[#0A0A0A] rounded-md flex-col gap-3 p-5"
                >
                  <div className="flex w-full h-[60px] gap-3">
                    <div className="flex w-[60px] h-full">
                      <Image
                        src="/assets/company-not-found.png"
                        layout="responsive"
                        width={50}
                        height={50}
                        alt="img-job"
                        className="w-full h-full rounded-md object-cover"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <h4 className="flex w-full h-1/2 font-bold items-center hover:underline hover:cursor-pointer">
                        {res?.title}
                      </h4>
                      <p className="flex w-full h-1/2 font-semibold items-center">
                        {res?.company}{" "}
                        {`| ${moment(res?.startDate).format("MMM YYYY")} - ${
                          res?.endDate === null
                            ? "Now"
                            : moment(res?.endDate).format("MMM YYYY")
                        }`}{" "}
                        ({getDurationLabel(res?.startDate, res?.endDate)})
                      </p>
                    </div>
                  </div>

                  <div
                    className="flex w-full text-white flex-col items-start bg-[#0A0A0A]"
                    dangerouslySetInnerHTML={{ __html: res?.description }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="pb-[800px]" />
    </div>
  );
}
