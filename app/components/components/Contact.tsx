import { Form } from "@remix-run/react";
import { useRef } from "react";
import { RiSendPlaneFill } from "react-icons/ri";

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
        Text me
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
            placeholder="your name"
            name="yourname"
          />
          <input
            type="text"
            className="bg-gray-900 border-0 outline-none w-full p-3 text-lg"
            placeholder="your email"
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
      </div>
    </div>
  );
}
