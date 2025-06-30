import { HiArrowUpRight } from "react-icons/hi2";
import Link from "../ui/Link";

type experience = {
  name: string;
  designation: string;
  descrption?: string;
  time: string;
  link?: string;
  tech?: string[];
};
const experiences: experience[] = [
  {
    name: "NoScrubs Inc, Austin, USA",
    designation: "Software Development Intern ( Remote )",
    descrption:
      "Implemented OAuth for secure phone number verification, improving user authentication workflows. Integrated Stripe to enable saving and managing user payment methods, streamlining experience. Developed and enhanced core application features using Ruby on Rails for backend and Expo (React Native) for the mobile and web interface.",
    time: "Oct - Dec 2024",
    link: "https://noscrubs.io/",
    tech: ["Ruby on Rails", "React Native (expo)", "Postgresql"],
  },
  {
    name: "Asambhav, Ahmedabad, India",
    designation: "Web Developer Intern ( Remote )",
    descrption:
      "Worked on developing a Chrome extension for generating portfolios from LinkedIn by scraping data, utilizing LLM (OpenAI) for enhanced data processing. Worked on creating another Chrome extension to generate tailored resumes for specific job postings on LinkedIn, leveraging LLM (OpenAI).",
    time: "Apr - Sept 2024",
    link: "https://asambhav.in/",
    tech: [
      "React.js",
      "Node.js",
      "Postgresql",
      "GenAI (OpenAI)",
      "Chrome Extension Development",
    ],
  },
];

export default function Experiences() {
  return (
    <div className="mt-16 md:mt-24">
      <div className="text-2xl md:text-3xl font-light mx-auto border-b border-emerald-500 w-fit">
        Experiences
      </div>
      <div className="flex flex-col gap-4 mt-8">
        {experiences?.map((item, i) => (
          <Card key={i} data={item} />
        ))}
      </div>
    </div>
  );
}

function Card({ data }: { data: experience }) {
  return (
    <div className="text-md md:text-lg font-light flex flex-col gap-3 border-b border-gray-700 border-dashed pb-4">
      <div className="flex flex-row justify-between flex-wrap gap-x-4">
        <Link href={data?.link}>
          <div className="flex flex-row justify-between place-items-center gap-2">
            <div key={data.name} className="text-lg md:text-xl">
              {data.name}
            </div>
            {data?.link && (
              <div className="text-md md:text-lg" key={data.link}>
                <HiArrowUpRight />
              </div>
            )}
          </div>
        </Link>
        <div className="text-gray-400">{data.time}</div>
      </div>
      <div className="text-md md:text-lg text-emerald-100">
        {data.designation}
      </div>
      <div className="text-gray-400 text-sm md:text-base text-justify">{data?.descrption}</div>
      <div className="text-white flex flex-row font-dmmono flex-wrap text-xs md:text-sm">
        {data?.tech?.map((item, i) => (
          <>
            <div key={i} className="w-fit">
              {item}
            </div>
            {i < data.tech!.length - 1 && (
              <div
                key={i + "sep"}
                className="w-1 h-1 rounded-full bg-emerald-500 my-auto mx-2"
              ></div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
