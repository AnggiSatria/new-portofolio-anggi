"use client";

import { IResponseGetSkill } from "@/shared/interfaces";
import { useReadSkills } from "@/shared/service/skills";
import Image from "next/image";

const SkillSetSection = ({}) => {
  const { data: dataSkills } = useReadSkills();

  const skills = dataSkills?.data;

  return (
    <div className="flex w-full items-center flex-col gap-5">
      <h2 className="flex w-full h-6 items-center justify-center text-center font-bold text-white text-2xl">
        SKILL SET
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6 w-11/12 max-w-6xl justify-center">
        {skills?.flatMap((res: IResponseGetSkill, idx: number) => {
          return (
            <div key={idx} className="flex w-32 h-32">
              <Image
                src={res?.image}
                layout="responsive"
                width={128}
                height={128}
                alt={res?.id}
                className="w-full h-full rounded-md object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillSetSection;
