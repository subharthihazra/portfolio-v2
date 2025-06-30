import { FaPlayCircle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { HiArrowUpRight } from "react-icons/hi2";
import { IoDocumentTextOutline } from "react-icons/io5";
import Link from "../ui/Link";

type project = {
  name: string;
  descrption?: string;
  tech?: string[];
  liveLink?: string;
  videoLink?: string;
  docsLink?: string;
  repoLink?: string;
  linkType?: "liveLink" | "videoLink" | "docsLink" | "repoLink";
};
const projects: project[] = [
  {
    name: "Oauth2.0 Client Library",
    descrption:
      "Developed a TypeScript OAuth2 client library supporting both client-side and server-side implementations, with Zod for validation, ensuring type safety and robust error handling. Integrated PKCE for secure authorization and ensured compatibility with Kinde, Auth0 and Clerk.",
    tech: ["Oauth2.0", "Typescript", "PKCE"],
    repoLink: "https://github.com/subharthihazra/subh-oauth2",
    liveLink: "https://subh-oauth2-demo2.vercel.app/login",
    linkType: "repoLink",
  },
  {
    name: "Cuddly",
    descrption:
      "A one stop platform for all Pet related problems, with the features to rehome and adopt a pet, and know more about pets with a magical touch of AI.",
    repoLink: "https://github.com/algovengers/cuddly",
    videoLink: "https://youtu.be/PZjfmZcSf7I?feature=shared",
    docsLink:
      "https://dev.to/afeefuddin/cuddly-one-stop-petcare-and-rehome-solution-3nn2",
    liveLink: "https://cuddly-buddy.vercel.app/",
    tech: ["Langchain", "LLMS", "Firebase", "Redis", "Socket.io"],
    linkType: "liveLink",
  },
  {
    name: "MindMate",
    descrption: "AI powered mental health chat assistance",
    tech: [
      "GenAI",
      "Web Sockets",
      "Firebase",
      "React.JS",
      "Tailwind",
      "Nodemailer",
    ],
    liveLink: "https://mind-mate-wellness.vercel.app/",
    videoLink: "https://www.youtube.com/watch?v=fUD5HcZhtQI",
    repoLink: "https://github.com/algovengers/MindMate",
    linkType: "liveLink",
  },
  {
    name: "Snakes and Ladders Game",
    descrption:
      "This is a multiplayer Snakes and Ladders Game that can be played together in real-time through internet",
    tech: ["Node.JS", "Javascript", "Socket.IO", "CSS", "HTML"],
    liveLink: "https://snakes.riverslide.com/",
    repoLink: "https://github.com/subharthihazra/Snakes-and-Ladders-Game",
    linkType: "liveLink",
  },
];

export default function Projects() {
  return (
    <div className="mt-16 md:mt-24">
      <div className="text-2xl md:text-3xl font-light mx-auto border-b border-yellow-500 w-fit">
        Projects
      </div>
      <div className="flex flex-col gap-4 mt-8">
        {projects?.map((item, i) => (
          <Card key={i} data={item} />
        ))}
      </div>
    </div>
  );
}

function Card({ data }: { data: project }) {
  const link = data.linkType ? data[data.linkType] : null;
  return (
    <div className="text-md md:text-lg font-light flex flex-col gap-3 border-b border-gray-700 border-dashed pb-4">
      <div className="flex flex-row justify-between">
        <Link href={link!}>
          <div className="flex flex-row justify-between place-items-center gap-2">
            <div key={data.name} className="text-lg md:text-xl">
              {data?.name}
            </div>
            {link && (
              <div className="text-md md:text-lg" key={link}>
                <HiArrowUpRight />
              </div>
            )}
          </div>
        </Link>
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
                className="w-1 h-1 rounded-full bg-yellow-500 my-auto mx-2"
              ></div>
            )}
          </>
        ))}
      </div>
      <div className="flex flex-row gap-4 flex-wrap">
        {data.repoLink && (
          <LinkIconButton link={data.repoLink} key="link1">
            <FaGithub />
          </LinkIconButton>
        )}
        {data.videoLink && (
          <LinkIconButton link={data.videoLink} key="link2">
            <FaPlayCircle />
          </LinkIconButton>
        )}
        {data.docsLink && (
          <LinkIconButton link={data.docsLink} key="link3">
            <IoDocumentTextOutline />
          </LinkIconButton>
        )}
        {data.liveLink && (
          <LinkIconButton link={data.liveLink} key="link4">
            <HiArrowUpRight />
          </LinkIconButton>
        )}
      </div>
    </div>
  );
}

function LinkIconButton({
  link,
  children,
}: {
  link?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={link}>
      <div className="bg-yellow-950 rounded-full h-8 md:h-10 w-8 md:w-10 flex flex-row justify-center place-items-center text-xl md:text-2xl">
        {children}
      </div>
    </Link>
  );
}
