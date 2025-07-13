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
import { useEffect } from "react";

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
        _url: "https://subharthi.me",
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
            _url: "https://subharthi.me",
            _subject: "New DM at Portfolio!",
            _captcha: "false",
            _template: "box",
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
              Referer: "https://subharthi.me",
              Origin: "https://subharthi.me",
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
    { name: "description", content: "Welcome to My Portfolio!" },
    { property: "og:image", content: "https://subharthi.me/api/og" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://subharthi.me" },
  ];
};

export default function Index() {
  const { ENV } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();
  const location = useLocation();

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
      <div className="max-w-3xl px-6 md:mx-auto">
        <Header />
        <Hero data={{ resumeUrl: ENV?.resumeUrl }} />
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
