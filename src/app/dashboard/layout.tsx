"use client";

import React, { useState, ReactNode, useEffect } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const GooeyNav = dynamic(
  () => import("@/shared/ui/components/GooeyNav/GooeyNav"),
  {
    ssr: false,
  }
);

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [open, setOpen] = useState(false);

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
    <div className="w-full min-h-screen bg-gradient-to-r from-[#534F4F] to-[#1D1A1A] flex justify-center px-4 sm:px-6 lg:px-8 py-8 border border-black">
      <div className="w-full max-w-screen-xl flex flex-col md:flex-row gap-6">
        {/* === SIDEBAR (desktop only) === */}
        <aside className="hidden md:flex w-full md:w-1/4 bg-[#0A0A0A] rounded-xl shadow-md p-6 flex-col items-center gap-4">
          <div className="flex justify-center">
            <Image
              src="/assets/gw.jpg"
              alt="Profile Picture"
              width={128}
              height={128}
              className="rounded-full border-2 border-white shadow-md object-cover"
            />
          </div>

          <div className="text-center space-y-1">
            <h1 className="text-white font-semibold text-lg sm:text-xl">
              Anggi Satria
            </h1>
            <p className="text-gray-400 text-sm sm:text-xs">
              Frontend Developer | React & Next.js
            </p>
          </div>

          <div className="w-full border border-[#787777] my-3" />

          <div className="w-full overflow-hidden">
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
        </aside>

        {/* === MAIN CONTENT === */}
        <main className="relative w-full md:w-3/4 min-h-32 md:h-[640px] bg-transparent rounded-xl flex flex-col">
          {/* === MOBILE HEADER === */}
          <div className="md:hidden z-10 flex items-center justify-between mb-6">
            {/* LEFT: Profile + Name */}
            <div className="flex items-center gap-3">
              <Image
                src="/assets/gw.jpg"
                alt="Profile Picture"
                width={40}
                height={40}
                priority
                className="rounded-full border border-white object-cover"
              />
              <div className="flex flex-col">
                <span className="text-white font-medium text-sm">
                  Anggi Satria
                </span>
                <span className="text-gray-400 text-xs">
                  Frontend Developer
                </span>
              </div>
            </div>

            {/* RIGHT: Menu button */}
            <button
              onClick={() => setOpen(true)}
              className="text-white hover:scale-110 transition-transform"
            >
              <Menu size={28} />
            </button>
          </div>

          {/* === PAGE CONTENT === */}
          {children}
        </main>
      </div>

      {/* === FULLSCREEN DRAWER (mobile only) === */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-[#0A0A0A] flex flex-col items-center justify-center md:hidden"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 text-white hover:scale-110 transition-transform"
            >
              <X size={32} />
            </button>

            <div className="w-full px-8">
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
