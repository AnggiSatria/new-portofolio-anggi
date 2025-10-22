"use client";
import { useReadExperiences } from "@/shared/service/experiences/hooks";
import moment from "moment";
import Image from "next/image";
import React from "react";
import Skeleton from "react-loading-skeleton";

export default function ExpComp() {
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
    <div className="inline-flex w-full h-full shadow-md text-white flex-col gap-5">
      <div className="flex w-full overflow-y-auto flex-col gap-5 custom-scrollbar md:pr-2.5">
        <div className="flex w-full md:sticky top-0 z-10 bg-[#0a0a0a] rounded-md">
          <h2 className="w-full font-bold text-2xl p-3">Experiences</h2>
        </div>

        {loadingExperience
          ? [1, 2, 3, 4]?.map((idx: number) => {
              return (
                <div
                  key={idx}
                  className="inline-flex w-full h-fit bg-[#0A0A0A] rounded-md flex-col gap-3 p-5 shadow-md"
                >
                  {/* Bagian atas: logo + teks */}
                  <div className="flex w-full h-[60px] gap-3 items-center">
                    <Skeleton
                      height={60}
                      width={60}
                      baseColor="#1a1a1a"
                      highlightColor="#2c2c2c"
                      className="rounded-md"
                    />
                    <div className="flex flex-col gap-2 w-full">
                      <Skeleton
                        width="40%"
                        height={20}
                        baseColor="#1a1a1a"
                        highlightColor="#2c2c2c"
                      />
                      <Skeleton
                        width="60%"
                        height={16}
                        baseColor="#1a1a1a"
                        highlightColor="#2c2c2c"
                      />
                    </div>
                  </div>

                  <Skeleton
                    count={3}
                    baseColor="#1a1a1a"
                    highlightColor="#2c2c2c"
                    className="rounded"
                  />
                </div>
              );
            })
          : sortedData?.map((res: any, idx: number) => {
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
  );
}
