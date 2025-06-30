import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import Link from "../ui/Link";
import { IoMail } from "react-icons/io5";

export default function Socials() {
  return (
    <div className="flex flex-row gap-4 flex-wrap justify-center">
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
