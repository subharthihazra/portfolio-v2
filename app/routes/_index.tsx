import { ActionFunction, json, type MetaFunction } from "@remix-run/node";
import {
  useActionData,
  useLoaderData,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import { UAParser } from "ua-parser-js";
import axios from "axios";
import { z } from "zod";
import { messageModel } from "models/message.server";
import { connectToDatabase } from "utils/db.server";
import Contact from "~/components/components/Contact";
import Experiences from "~/components/components/Experiences";
import Footer from "~/components/components/Footer";
import Header from "~/components/components/Header";
import Hero from "~/components/components/Hero";
import Projects from "~/components/components/Projects";
import Skills from "~/components/components/Skills";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";

const siteBaseUrl = "https://subharthi.site";

export const loader = async () => {
  await connectToDatabase();
  return json({
    ENV: { resumeUrl: process.env.PUBLIC_RESUME_URL },
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("yourname")?.toString().trim() || "";
  const email = formData.get("youremail")?.toString().trim() || "";
  const message = formData.get("yourmessage")?.toString().trim() || "";

  // console.log("==info>", name, email, message);

  let metadata = "";

  try {
    const userAgentHeader = request.headers.get("user-agent") || "";
    const parser = new UAParser(userAgentHeader);
    const ua = parser.getResult();

    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    metadata = JSON.stringify({
      ip,
      userAgent: userAgentHeader,
      browser: ua.browser.name || "unknown",
      browserVersion: ua.browser.version || "unknown",
      os: ua.os.name || "unknown",
      osVersion: ua.os.version || "unknown",
      device: ua.device.type || "desktop",
      submittedAt: new Date().toISOString(),
    });

    // console.log("==meta=>", meta);

    const isAllEmpty = !name && !email && !message;

    if (!isAllEmpty) {
      const response = await messageModel.create({
        name,
        email,
        message,
        metadata,
      });

      // sends a personal DM to my email via FormSubmit

      const isValidEmail = z.string().email().safeParse(email).success;

      const messageToDM = `${
        !isValidEmail ? `Email:\n[ ${email} ]\n\n` : ""
      }${message}`;

      console.log("fdt", String(process.env.PRIVATE_FORMSUBMIT_URL), {
        name,
        ...(isValidEmail && { email }),
        message: messageToDM,
        _url: siteBaseUrl,
        _subject: "New DM at Portfolio!",
        _captcha: "false",
        _template: "box",
      });

      void axios
        .post(
          String(process.env.PRIVATE_FORMSUBMIT_URL),
          {
            name,
            ...(isValidEmail && { email }),
            message: messageToDM,
            _url: siteBaseUrl,
            _subject: "New DM at Portfolio!",
            _captcha: "false",
            _template: "box",
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
              Referer: siteBaseUrl,
              Origin: siteBaseUrl,
              Accept:
                "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            },
          }
        )
        .catch((err) => {
          console.error("Fire-and-forget Axios error:", err);
        });
      // console.log(data);

      return json({ message: response ? "success" : "error" });
    } else {
      return json({ message: "error" });
    }
  } catch (e) {
    console.log("ERROR occurred: ", e);
    return json({ message: "error" });
  }
};

export const meta: MetaFunction = () => {
  return [
    { title: "Subharthi Hazra | Portfolio" },
    { name: "description", content: "Let's connect! 🤝🏾" },
    { property: "og:image", content: `${siteBaseUrl}/api/og` },
    { property: "og:type", content: "website" },
    { property: "og:url", content: siteBaseUrl },
  ];
};

export default function Index() {
  const { ENV } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isEasterEgg, setIsEasterEgg] = useState(false);

  useEffect(() => {
    if (actionData?.message === "success") {
      toast.success("Text Sent!", {
        style: {
          border: "1px solid #713200",
        },
        iconTheme: {
          primary: "#10b981",
          secondary: "white",
        },
      });

      const hash = location.hash;
      navigate(`/${hash}`, { replace: true, preventScrollReset: true });
    }
  }, [actionData, navigate, location]);

  return (
    <div className="custom-background">
      {/* Easter Egg Background Effects */}
      <div 
        className={`fixed inset-0 transition-opacity duration-[1500ms] ease-in-out pointer-events-none bg-[#030207] ${
          isEasterEgg ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Subtle retro dot pattern for texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:20px_20px] opacity-70" />
        
        {/* Sleek digital grids */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />

        {/* Dynamic Colorful Aura Lights */}
        {/* Aura 1: Neon Purple/Violet */}
        <div className="absolute top-[10%] left-[15%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tr from-purple-600/20 to-violet-800/10 blur-[100px] md:blur-[140px] animate-float-slow" />

        {/* Aura 2: Deep Blue/Indigo */}
        <div className="absolute bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-indigo-700/15 to-blue-600/5 blur-[120px] md:blur-[160px] animate-float-medium" />

        {/* Aura 3: Warm Orange/Rose gold */}
        <div className="absolute top-[40%] right-[15%] w-[35vw] h-[35vw] rounded-full bg-gradient-to-bl from-rose-500/15 via-orange-600/10 to-transparent blur-[90px] md:blur-[130px] animate-float-fast" />

        {/* Aura 4: Mystic Teal/Emerald */}
        <div className="absolute bottom-[20%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-teal-500/15 via-emerald-600/5 to-transparent blur-[110px] md:blur-[150px] animate-float-slow" />
      </div>

      <div className="relative z-10 max-w-3xl px-6 md:mx-auto">
        <Header />
        <Hero data={{ resumeUrl: ENV?.resumeUrl }} onDpClick={() => setIsEasterEgg((prev) => !prev)} />
        <Experiences />
        <Projects />
        <Skills />
        <Contact reset={actionData?.message === "success"} />
        <Footer />
        <Toaster position="bottom-right" reverseOrder={false} />
      </div>
    </div>
  );
}
