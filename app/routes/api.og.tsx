import { LoaderFunction } from "@remix-run/node";
import satori from "satori";
import { readFileSync, existsSync, writeFile } from "fs";
import { join } from "path";
import { Resvg } from "@resvg/resvg-js";

const suseFont = readFileSync(join(process.cwd(), "app/assets/fonts/suse.ttf"));
const emojiFont = readFileSync(
  join(process.cwd(), "app/assets/fonts/NotoEmoji-Regular.ttf"),
);
const OUTPUT_PATH = join(process.cwd(), "app/assets/og-image.png");

const generateSvg = async () => {
  return await satori(
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#010b15",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
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
          gap: 20,
        }}
      >
        <div
          style={{
            width: "230px",
            height: "5px",
            backgroundColor: "#ec4899",
          }}
        ></div>
        <div
          style={{
            fontSize: 100,
            fontWeight: 700,
            color: "#f1f5f9",
          }}
        >
          Subharthi Hazra
        </div>
        <div
          style={{
            fontSize: 50,
            fontWeight: 500,
            color: "#2db381",
          }}
        >
          {`a Dev from  India ❤️`}
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Suse",
          data: suseFont,
          weight: 400,
          style: "normal",
        },
        {
          name: "Emoji",
          data: emojiFont,
          weight: 400,
          style: "normal",
        },
      ],
    },
  );
};

export const loader: LoaderFunction = async () => {
  if (!existsSync(OUTPUT_PATH)) {
    const svg = await generateSvg();
    const png = new Resvg(svg).render().asPng();

    void writeFile(OUTPUT_PATH, png, () => {});

    return new Response(png, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } else {
    const imageBuffer = readFileSync(OUTPUT_PATH);

    return new Response(imageBuffer, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }
};
