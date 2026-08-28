import type { Metadata } from "next";
  import "./globals.css";

  export const metadata: Metadata = {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "https://waitlist.cultcreativeasia.com"
    ),
    title: "Cult Creative — Creator App Waitlist",
    description:
      "Cult Creative connects you with brand campaigns that fit your feed. Pitch, sign, deliver, and invoice — one app, real ringgit. Join the waitlist for early access.",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "48x48" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    openGraph: {
      title: "Cult Creative — Creator App Waitlist",
      description:
        "Get paid to create. Join the waitlist for early access to the Cult Creative creator app.",
      siteName: "Cult Creative",
      images: [{ url: "/favicon-192x192.png", width: 192, height: 192 }],
      type: "website",
    },
  };

  export default function RootLayout({
    children,
  }: Readonly<{ children: React.ReactNode }>) {
    return (
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
          <link rel="preconnect" href="https://fonts.cdnfonts.com" crossOrigin="anonymous" />
          <link rel="stylesheet" href="https://use.typekit.net/chd2fal.css" />
        </head>
        <body className="min-h-screen bg-[#231f20] text-white antialiased">
          {children}
        </body>
      </html>
    );
  }