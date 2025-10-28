"use client";
import {
  IResponseGetCertificateGet,
  IResponseGetSkill,
} from "@/shared/interfaces";
import { useReadCertificate } from "@/shared/service/certificate";
import { useReadEducation } from "@/shared/service/education";
import { useReadSkills } from "@/shared/service/skills";
import moment from "moment";
import Image from "next/image";
import React from "react";
import Skeleton from "react-loading-skeleton";

export default function BackgroundComp() {
  const { data: educationData, isLoading: loadingEducation } =
    useReadEducation();
  const education = educationData?.data;

  const sortedData = education?.sort(
    (a: any, b: any) =>
      moment(b.startDate).valueOf() - moment(a.startDate).valueOf()
  );

  const { data: dataCertificate, isLoading: loadingCertificate } =
    useReadCertificate();
  const certificate = dataCertificate?.data;

  const { data: dataSkills, isLoading: loadingSkills } = useReadSkills();

  const skills = dataSkills?.data;

  return (
    <div className="inline-flex w-full h-full text-white flex-col gap-5">
      <div className="flex w-full lg:h-[30%] overflow-y-auto flex-col gap-5 custom-scrollbar md:pr-2.5">
        <div className="flex w-full md:sticky top-0 z-10 bg-[#0a0a0a] rounded-md">
          <h2 className="w-full font-bold text-2xl p-3">Education</h2>
        </div>

        {sortedData?.map((res: any, idx: number) => {
          return (
            <div
              key={idx}
              className="inline-flex w-full h-fit bg-[#0A0A0A] rounded-md flex-col gap-3 p-5"
            >
              <div className="flex w-full min-h-[60px] gap-3">
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

                <div className="flex flex-col gap-1.5 w-full">
                  <h4 className="flex w-full min-h-1/2 font-bold items-center hover:underline hover:cursor-pointer gap-3">
                    {res?.institution}
                    <span>{"|"}</span>
                    <span className="flex text-white flex-col items-start bg-[#0A0A0A]">
                      {`${moment(res?.startDate).format("MMM YYYY")} ${
                        res?.endDate
                          ? `- ${moment(res?.endDate).format("MMM YYYY")}`
                          : "- Present"
                      }`}
                    </span>
                  </h4>
                  <p className="flex w-full h-1/2 font-semibold items-center">
                    {`${res?.degree} - ${res?.field}`}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex w-full lg:h-1/3 overflow-y-auto flex-col gap-5 custom-scrollbar md:pr-2.5">
        <div className="flex w-full md:sticky top-0 z-10 bg-[#0a0a0a] rounded-md">
          <h2 className="w-full font-bold text-2xl p-3">Certificate</h2>
        </div>

        {loadingCertificate
          ? [1, 2, 3, 4]?.map((idx: number) => {
              return (
                <div
                  key={idx}
                  className="inline-flex w-full h-fit bg-[#0A0A0A] rounded-md p-5 gap-5 shadow-md"
                >
                  {/* Bagian kiri: gambar */}
                  <div className="flex w-[160px] h-[120px]">
                    <Skeleton
                      height={120}
                      width={160}
                      baseColor="#1a1a1a"
                      highlightColor="#2c2c2c"
                      className="rounded-md"
                    />
                  </div>

                  {/* Bagian kanan: teks */}
                  <div className="flex flex-col gap-2 w-full justify-center">
                    <Skeleton
                      width="60%"
                      height={24}
                      baseColor="#1a1a1a"
                      highlightColor="#2c2c2c"
                      className="rounded"
                    />
                    <Skeleton
                      count={2}
                      baseColor="#1a1a1a"
                      highlightColor="#2c2c2c"
                      className="rounded"
                    />
                  </div>
                </div>
              );
            })
          : certificate?.map((res: IResponseGetCertificateGet, idx: number) => {
              return (
                <div
                  key={idx}
                  className="inline-flex w-full h-fit bg-[#0A0A0A] rounded-md p-5 gap-5"
                >
                  <div className="flex w-[160px] h-[120px]">
                    <Image
                      src={res?.image || `/assets/company-not-found.png`}
                      layout="responsive"
                      width={50}
                      height={50}
                      alt="img-job"
                      className="w-full h-full rounded-md object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5 w-full">
                    <div className=" flex w-full h-fit font-bold items-center hover:underline hover:cursor-pointer">
                      {res?.title}
                    </div>
                    <p className="flex text-white flex-col items-start bg-[#0A0A0A]">
                      {res?.issuer}
                    </p>
                    <p className="flex text-white flex-col items-start bg-[#0A0A0A]">
                      {moment(res?.issueDate).format("DD - MM - YYYY")}
                    </p>
                  </div>
                </div>
              );
            })}
      </div>

      <div className="flex w-full lg:h-1/3 overflow-y-auto flex-col gap-5 custom-scrollbar md:pr-2.5">
        <div className="flex w-full md:sticky top-0 z-10 bg-[#0a0a0a] rounded-md">
          <h2 className="w-full font-bold text-2xl p-3">Skills</h2>
        </div>

        <div className="w-full inline-grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-1.5 justify-center">
          {skills?.map((res: IResponseGetSkill) => {
            return (
              <div key={res?.id} className="flex w-full h-[120px] mx-auto">
                <Image
                  src={res?.image}
                  layout="responsive"
                  width={50}
                  height={50}
                  alt={res?.id}
                  className="w-full h-full rounded-md object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
