import { LoaderFunction, redirect } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  return redirect(process.env.PUBLIC_RESUME_URL!);
};

export default function Resume() {
  return null; // No need to render anything
}
