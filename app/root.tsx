import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=SUSE:wght@100..800&family=Agu+Display&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "icon",
    href: "/ico.png",
    type: "image/x-icon",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  return isRouteErrorResponse(error) && error.status === 404 ? (
    <div className="text-center min-h-screen flex flex-col place-content-center px-6">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg text-slate-300">
        Why are you here, homie &#128527;?
      </p>
      <a
        href="/"
        className="mt-6 inline-block text-emerald-400 underline hover:text-emerald-300"
      >
        Back to Home
      </a>
    </div>
  ) : (
    <div className="text-center min-h-screen flex flex-col place-content-center px-6">
      <h1 className="text-xl font-bold mb-4">Something went wrong</h1>
      <p className="text-md text-slate-300">
        {(error instanceof Error && error.message) || "Unknown error."}
      </p>
    </div>
  );
}
