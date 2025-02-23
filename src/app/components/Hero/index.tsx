import DecryptedText from "@/shared/ui/text/DecryptedText";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

interface Props {}

const HeroSection: NextPage<Props> = ({}) => {
  return (
    <div
      id="#hero"
      className="hero-section flex flex-col justify-center items-center"
    >
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4  z-50">
        <Image
          src="/assets/gw.jpg"
          alt="Profile Picture"
          width={128}
          height={128}
          className="object-cover"
        />
      </div>

      <h1 className="text-4xl font-bold">Anggi Satria</h1>
      <p className="text-lg text-gray-300 mt-2">
        Frontend Developer | React & Next.js
      </p>

      <div className="max-w-lg text-gray-400 mt-4">
        <DecryptedText
          text="I am a Frontend Developer who focuses on creating UI/UX attractive and
        high performance using modern technologies such as Next.js and Tailwind
        CSS."
          animateOn="view"
          revealDirection="center"
        />
      </div>

      <div className="mt-6 flex gap-4 z-50">
        <a
          href="/assets/CV_Anggi_Satria.pdf"
          className="z-50 cursor-pointer px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition"
          download
        >
          Download CV
        </a>
        <Link
          href="#projects"
          className="z-50 cursor-pointer px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg shadow-md transition"
        >
          See More
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
