"use client";
import { IResponseGetProject } from "@/shared/interfaces";
import { useReadProjects } from "@/shared/service/projects";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Skeleton from "react-loading-skeleton";

export default function ProjectComp() {
  const { data: dataProject, isLoading: loadingProject } = useReadProjects();
  const projects = dataProject?.data;

  return (
    <div className="inline-flex w-full h-full shadow-md text-white flex-col gap-5">
      <div className="flex w-full overflow-y-auto flex-col gap-5 custom-scrollbar md:pr-2.5">
        <div className="flex w-full md:sticky top-0 z-10 bg-[#0a0a0a] rounded-md">
          <h2 className="w-full font-bold text-2xl p-3">Projects</h2>
        </div>

        {loadingProject
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
          : projects?.map((res: IResponseGetProject, idx: number) => {
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
                    <Link
                      href={res?.link}
                      className=" flex w-full h-fit font-bold items-center hover:underline hover:cursor-pointer"
                    >
                      {res?.title}
                    </Link>

                    <div
                      className="flex w-full text-white flex-col items-start bg-[#0A0A0A] !font-normal "
                      dangerouslySetInnerHTML={{ __html: res?.description }}
                    />
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
}
