import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";


const inter=Inter({subsets:['latin']});

export const metadata = {
  title: "Next-JS AI Project",
  description: "Generated by Prem Shravan",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme:dark
    }}>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Header */}
          <Header />
          <main className="min-h-screen"> {children}</main>
          <Toaster richColors/>
          {/* footer */}
          <footer className="bg-muted/50 py-12">
            <div className="container mx-auto text-center text-gray-100">
              <p>Love from Shravan</p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
