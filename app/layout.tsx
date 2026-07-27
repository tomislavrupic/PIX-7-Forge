import type { Metadata } from "next";
import "./globals.css";

const publicUrl = "https://tomislavrupic.github.io/PIX-7-Forge";
const title = "PIX-7 Forge — Component Generator";
const description = "Generate 51 deterministic PIX-7 interface and Neko City motion systems from stable seeds.";

export const metadata: Metadata = {
  metadataBase: new URL(publicUrl),
  title,
  description,
  icons: { icon: `${publicUrl}/favicon.svg`, shortcut: `${publicUrl}/favicon.svg` },
  openGraph: {
    title,
    description,
    type: "website",
    url: publicUrl,
    images: [{ url: `${publicUrl}/og-v2.png`, width: 1200, height: 630, alt: "PIX-7 Forge — 51 Neko City systems" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${publicUrl}/og-v2.png`] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
