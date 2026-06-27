import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F7F4ED",
          border: "3px solid #141210",
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 800,
            color: "#9B1B30",
            fontFamily: "monospace",
          }}
        >
          A
        </div>
      </div>
    ),
    { ...size }
  );
}
