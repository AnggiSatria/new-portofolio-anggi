import { NextPage } from "next";

interface Props {}

const SkillSetSection: NextPage<Props> = ({}) => {
  const data = [1, 2, 3, 4, 5, 6];

  return (
    <div className="flex w-full items-center flex-col gap-5">
      <h2 className="flex w-full h-6 items-center justify-center text-center font-bold text-white text-2xl">
        SKILL SET
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-6 w-full max-w-6xl justify-center">
        {data?.flatMap((res: any, idx: number) => {
          return (
            <div
              key={idx}
              className="flex max-w-32 h-32"
              style={{ backgroundImage: `url(${res?.url})` }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default SkillSetSection;
