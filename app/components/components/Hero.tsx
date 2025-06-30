import myPic from "../../assets/mypic.jpg";
import { HiArrowUpRight } from "react-icons/hi2";
import Link from "../ui/Link";
import Socials from "./Socials";

export default function Hero({ data }: { data?: { resumeUrl?: string } }) {
  return (
    <div className="place-items-center my-10 md:my-20 flex flex-col gap-5 md:gap-10">
      <div className="w-16 md:w-20 aspect-square rounded-full overflow-hidden">
        <img src={myPic} alt="My DP" />
      </div>
      <div>
        <div className="text-2xl md:text-5xl font-thin text-center">
          {"I'm"} <span>Subharthi Hazra</span>, a{" "}
          <span>Software Developer</span> from Kolkata, India !
        </div>
      </div>
      <div className="place-items-center flex flex-col gap-4">
        <div>stay in touch</div>
        <Socials />
      </div>
      <div className="place-items-center flex flex-row gap-8 flex-wrap justify-center">
        <TextButton link={data?.resumeUrl}>resume</TextButton>
        <TextButton link="#textme" newtab={false}>
          text me
        </TextButton>
      </div>
    </div>
  );
}

function TextButton({
  link,
  children,
  newtab,
}: {
  link?: string;
  children: React.ReactNode;
  newtab?: boolean;
}) {
  return (
    <Link href={link} newtab={newtab}>
      <div className="flex flex-row justify-between text-lg md:text-xl font-light place-items-center gap-2 border-b border-dashed">
        <div>{children}</div>
        <div className="text-md md:text-lg">
          <HiArrowUpRight />
        </div>
      </div>
    </Link>
  );
}
