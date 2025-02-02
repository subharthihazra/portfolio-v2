type skill = {
  name: string;
  level?: number;
};

type skillGroup = { name: string; skills: skill[] };

const skills: skillGroup[] = [
  {
    name: "web development",
    skills: [
      { name: "nodejs" },
      { name: "typescript", level: 50 },
      { name: "javascript" },
      { name: "reactjs" },
      { name: "nextjs" },
      { name: "tailwind" },
    ],
  },
  {
    name: "languages",
    skills: [
      { name: "python", level: 30 },
      { name: "c++", level: 75 },
      { name: "c", level: 85 },
      { name: "golang", level: 30 },
      { name: "rust", level: 30 },
    ],
  },
  {
    name: "others",
    skills: [
      {
        name: "React Native",
      },
    ],
  },
];

export default function Skills() {
  return (
    <div className="mt-16 md:mt-24">
      <div className="text-2xl md:text-3xl font-light mx-auto border-b border-blue-500 w-fit">
        Skills
      </div>
      <div className="gap-5 mt-8 grid grid-cols-1 md:grid-cols-2">
        {skills?.map((item, i) => (
          <Card key={i} data={item} />
        ))}
      </div>
    </div>
  );
}

function Card({ data }: { data: skillGroup }) {
  return (
    <div className="text-md md:text-lg font-light flex flex-col gap-3 border-b border-gray-700 border-dashed pb-4">
      <div>{data.name}</div>
      <div className="flex flex-row flex-wrap gap-x-3 gap-y-2 font-dmmono text-xs md:text-sm text-blue-200">
        {data?.skills?.map((item, i) => (
          <div key={i} className="flex flex-col w-fit">
            <div>{item.name}</div>
            {/* {item?.level && (
              <div
                className={`border-b border-gray-500 w-[${item.level}%]`}
              ></div>
            )} */}
          </div>
        ))}
      </div>
    </div>
  );
}
