import { LoaderFunction } from "@remix-run/node";
import satori from "satori";
import { readFileSync } from "fs";
import { join } from "path";
import { Resvg } from "@resvg/resvg-js";

const suseFont = readFileSync(join(process.cwd(), "app/assets/fonts/suse.ttf"));

export const loader: LoaderFunction = async () => {
  const svg = await satori(
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#010b15",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems:"center",
        fontFamily: "Suse",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div></div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          zIndex: 1,
          gap:20
        }}
      >
        <div
          style={{
            width: "140px",
            height: "5px",
            backgroundColor: "#ff7b4f",
          }}
        ></div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 700,
            color: "#f1f5f9",
          }}
        >
          Subharthi Hazra
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 500,
            color: "#ec4899",
          }}
        >
          {`a dev from  india ;)`}
        </div>
      </div>
    </div>,
    {
      width: 570,
      height: 250,
      fonts: [
        {
          name: "Suse",
          data: suseFont,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );

  const png = new Resvg(svg).render().asPng();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
