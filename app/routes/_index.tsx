import { ActionFunction, json, type MetaFunction } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import axios from "axios";
import { messageModel } from "models/message.server";
import { connectToDatabase } from "utils/db.server";
import Contact from "~/components/components/Contact";
import Experiences from "~/components/components/Experiences";
import Footer from "~/components/components/Footer";
import Header from "~/components/components/Header";
import Hero from "~/components/components/Hero";
import Projects from "~/components/components/Projects";
import Skills from "~/components/components/Skills";

export const loader = () => {
  connectToDatabase();
  return json({
    ENV: { resumeUrl: process.env.PUBLIC_RESUME_URL },
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("yourname");
  const email = formData.get("youremail");
  const message = formData.get("yourmessage");
  // console.log("==>", name, message);

  if (message) {
    const response = await messageModel.create({
      name,
      email,
      message,
    });
    // console.log(response);
    try {
      await axios.post(String(process.env.PRIVATE_MESSAGE_URL), {
        name,
        message,
      });
      // console.log(data);
    } catch (e) {
      console.log(e);
    }
    return json({ message: response ? "success" : "error" });
  } else {
    return json({ message: "incomplete" });
  }
};

export const meta: MetaFunction = () => {
  return [
    { title: "Subharthi Hazra | Portfolio" },
    { name: "description", content: "Welcome to My Portfolio!" },
  ];
};

export default function Index() {
  const { ENV } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <div className="max-w-3xl mx-6 md:mx-auto">
      <Header />
      <Hero data={{ resumeUrl: ENV?.resumeUrl }} />
      <Experiences />
      <Projects />
      <Skills />
      <Contact reset={actionData?.message === "success"} />
      <Footer />
    </div>
  );
}
