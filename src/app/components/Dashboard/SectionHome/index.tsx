import { useReadExperiences } from "@/shared/service/experiences/hooks";
import DecryptedText from "@/shared/ui/text/DecryptedText";
import moment from "moment";
import Image from "next/image";
import React from "react";

export default function SectionHome() {
  const { data: experienceData, isLoading: loadingExperience } =
    useReadExperiences();
  const experience = experienceData?.data;

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

  const sortedData = experience?.sort(
    (a: any, b: any) =>
      moment(a.startDate).valueOf() - moment(b.startDate).valueOf()
  );

  return (
    <>
      <div className="inline-flex w-full h-full shadow-md text-white flex-col gap-5">
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

        <div className="flex w-full overflow-y-auto flex-col gap-5 custom-scrollbar md:pr-2.5">
          <div className="flex w-full md:sticky top-0 z-10 bg-[#0a0a0a] rounded-md">
            <h2 className="w-full font-bold text-2xl p-3">Carrers</h2>
          </div>

          {sortedData?.map((res: any, idx: number) => {
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
    </>
  );
}
