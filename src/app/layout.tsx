import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Inter } from "next/font/google";
import { PortfolioProvider } from "@/context/PortfolioContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-one-gules-juc6kxjk7e.vercel.app"),
  title: "S Karthik | Software Engineer & IEEE Published Researcher",
  description: "M.Tech Integrated Software Engineering student at VIT-AP. IEEE-published quantum ML researcher. Building full-stack SaaS apps and QCNN pipelines for medical imaging.",
  keywords: [
    "S Karthik",
    "Software Engineering",
    "Java SQL Developer",
    "Next.js React MongoDB",
    "Quantum Machine Learning",
    "QCNN Brain Tumor",
    "Medical Image Analysis",
    "VIT-AP University",
    "DevFlow SaaS",
    "IEEE Published",
  ],
  authors: [{ name: "S Karthik", url: "mailto:skarthik7661@gmail.com" }],
  creator: "S Karthik",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-one-gules-juc6kxjk7e.vercel.app",
    title: "S Karthik | Software Engineer & IEEE Published Researcher",
    description: "IEEE-published quantum ML researcher & full-stack engineer. M.Tech student at VIT-AP building SaaS platforms and QCNN medical imaging pipelines.",
    siteName: "S Karthik Portfolio",
    images: [
      {
        url: "/images/profile_styled.jpg",
        width: 1200,
        height: 630,
        alt: "S Karthik - Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "S Karthik | Software Engineer & IEEE Published Researcher",
    description: "IEEE-published quantum ML researcher & full-stack engineer. M.Tech student at VIT-AP.",
    images: ["/images/profile_styled.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${inter.variable} h-full scroll-smooth antialiased dark`}
    >
      <body className="bg-[#030712] text-white selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden min-h-full font-inter">
        <script dangerouslySetInnerHTML={{ __html: `
          window.addEventListener('error', function(e) {
            var div = document.createElement('div');
            div.style.position = 'fixed';
            div.style.bottom = '0';
            div.style.left = '0';
            div.style.width = '100%';
            div.style.background = '#ef4444';
            div.style.color = '#ffffff';
            div.style.padding = '12px';
            div.style.zIndex = '999999';
            div.style.fontSize = '12px';
            div.style.fontFamily = 'monospace';
            div.style.wordBreak = 'break-all';
            div.innerText = 'Global Client Error: ' + e.message + ' (at ' + e.filename + ':' + e.lineno + ')';
            document.body.appendChild(div);
          });
          window.addEventListener('unhandledrejection', function(e) {
            var div = document.createElement('div');
            div.style.position = 'fixed';
            div.style.bottom = '50px';
            div.style.left = '0';
            div.style.width = '100%';
            div.style.background = '#f97316';
            div.style.color = '#000000';
            div.style.padding = '12px';
            div.style.zIndex = '999999';
            div.style.fontSize = '12px';
            div.style.fontFamily = 'monospace';
            div.style.wordBreak = 'break-all';
            div.innerText = 'Promise Rejection: ' + (e.reason ? (e.reason.message || e.reason) : 'Unknown reason');
            document.body.appendChild(div);
          });
        `}} />
        <PortfolioProvider>
          {children}
        </PortfolioProvider>
      </body>
    </html>
  );
}
