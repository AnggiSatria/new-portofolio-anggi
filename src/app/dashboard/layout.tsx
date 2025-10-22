"use client";

import React, { ReactNode } from "react";
import Image from "next/image";
import GooeyNav from "@/shared/ui/components/GooeyNav/GooeyNav";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const items = [
    { label: "Home", href: "/dashboard", value: "home" },
    { label: "Background", href: "/dashboard/background", value: "background" },
    {
      label: "Experiences",
      href: "/dashboard/experiences",
      value: "experiences",
    },
    { label: "Project", href: "/dashboard/projects", value: "projects" },
    { label: "Exit Dashboard", href: "/", value: "landing-page" },
  ];

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

            <div className="flex w-full border border-[#787777]" />

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
          </div>
        </div>

        <div className="w-full md:w-3/4 h-32 md:h-[640px]">{children}</div>
      </div>
      <div className="pb-[800px]" />
    </div>
  );
}
