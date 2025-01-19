import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Subharthi Hazra | Portfolio" },
    { name: "description", content: "Welcome to My Portfolio!" },
  ];
};

export default function Index() {
  return <div></div>;
}