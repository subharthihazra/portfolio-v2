import myPic from "../../assets/mypic.jpg";
import { FaLinkedinIn, FaGithub, FaXTwitter } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { HiArrowUpRight } from "react-icons/hi2";
import Link from "../ui/Link";

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
        <div className="flex flex-row gap-4">
          <RoundIconButton link="https://github.com/subharthihazra">
            <FaGithub />
          </RoundIconButton>
          <RoundIconButton link="https://twitter.com/SubharthiHazra">
            <FaXTwitter />
          </RoundIconButton>
          <RoundIconButton link="https://www.linkedin.com/in/subharthihazra/">
            <FaLinkedinIn />
          </RoundIconButton>
          <RoundIconButton link="mailto:subharthi75@gmail.com" newtab={false}>
            <IoMail />
          </RoundIconButton>
        </div>
      </div>
      <div className="place-items-center flex flex-row gap-8">
        <TextButton link={data?.resumeUrl}>resume</TextButton>
        <TextButton link="#textme" newtab={false}>text me</TextButton>
      </div>
    </div>
  );
}

function RoundIconButton({
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
      <div className="bg-white rounded-full h-10 md:h-12 w-10 md:w-12 text-black flex flex-row justify-center place-items-center text-xl md:text-2xl">
        {children}
      </div>
    </Link>
  );
}

function TextButton({
  link,
  children,
  newtab
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
