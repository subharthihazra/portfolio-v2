import { Form } from "@remix-run/react";
import { useRef } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import Socials from "./Socials";

export default function Contact({ reset = true }: { reset?: boolean }) {
  const submitRef = useRef<HTMLButtonElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit() {
    if (submitRef?.current) submitRef.current.disabled = true;
  }
  if (reset && formRef.current) {
    formRef.current.reset();
    if (submitRef?.current) submitRef.current.disabled = false;
  }

  return (
    <div className="mt-16 md:mt-24" id="textme">
      <div className="text-2xl md:text-3xl font-light mx-auto border-b border-y-rose-600 w-fit">
        {`Let's Connect`}
      </div>
      <div className="font-light text-gray-400 mt-8 text-center text-sm md:text-md">
        {`If you have any inquiries,
        collaboration proposals, or if you simply want to connect, feel free to
        reach out. I'm always open to new opportunities (freelance, internship,
        job). My inbox is always open.`}
      </div>
      <div className="gap-5 mt-8">
        <Form
          method="post"
          onSubmit={handleSubmit}
          ref={formRef}
          className="flex flex-col divide-y divide-gray-500 divide-dashed"
        >
          <input
            type="text"
            className="bg-gray-900 border-0 outline-none w-full p-3 text-lg"
            placeholder="your name (optional)"
            name="yourname"
          />
          <input
            type="text"
            className="bg-gray-900 border-0 outline-none w-full p-3 text-lg"
            placeholder="your email (optional)"
            name="youremail"
          />
          <textarea
            className="bg-gray-900 border-0 outline-none w-full resize-none p-3 text-lg"
            cols={5}
            placeholder="your message ..."
            name="yourmessage"
          />
          <div className="w-full py-3 flex flex-row justify-end">
            <button
              type="submit"
              value="go"
              className="ml-auto w-10 h-10 text-2xl bg-rose-900 rounded-full place-items-center disabled:bg-rose-950 disabled:text-gray-700"
              ref={submitRef}
            >
              <RiSendPlaneFill />
            </button>
          </div>
        </Form>
        <div className="font-light text-gray-400 my-6 flex flex-col place-items-center gap-4 text-sm md:text-md">
          {`Also you can DM in socials or email me`}
          <Socials />
        </div>
      </div>
    </div>
  );
}
