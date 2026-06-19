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
  title: "S Karthik | Software Engineering Portfolio",
  description: "Integrated M.Tech Software Engineering student at VIT-AP building full-stack web applications and machine learning systems. Explore projects, publications, and certifications.",
  keywords: [
    "S Karthik",
    "Software Engineering",
    "Java SQL Developer",
    "Next.js React MongoDB",
    "Quantum Machine Learning",
    "QCNN Brain Tumor",
    "Medical Image Analysis",
    "VIT-AP University",
  ],
  authors: [{ name: "S Karthik", url: "mailto:skarthik7661@gmail.com" }],
  creator: "S Karthik",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://skarthik.dev",
    title: "S Karthik | Software Engineering Portfolio",
    description: "Integrated M.Tech Software Engineering student at VIT-AP building high-performance scalable backend systems and medical image analysis deep learning pipelines.",
    siteName: "S Karthik Portfolio",
    images: [
      {
        url: "/images/placeholder.webp", // Will act as fallback, or another image
        width: 1200,
        height: 630,
        alt: "S Karthik Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "S Karthik | Software Engineering Portfolio",
    description: "Integrated M.Tech Software Engineering student at VIT-AP building high-performance scalable backend systems and medical image analysis deep learning pipelines.",
    images: ["/images/placeholder.webp"],
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
