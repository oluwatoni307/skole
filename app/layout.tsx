import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SkoleAI",
  description: "Tool that helps teachers grade essays",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="scroll-smooth" lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem forcedTheme="dark">
          <div className="flex flex-col justify-center w-full items-center py-[48px] lg:py-[128px]">
            <div className="w-full stagger-1 max-w-[1000px]" data-animate>
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
