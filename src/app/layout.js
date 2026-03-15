import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hand Gesture AI | Real-time Recognition",
  description: "A lightweight hand gesture recognition app built with TensorFlow.js and Next.js.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 antialiased`}>
        {/* Navigation Bar (Optional but looks professional) */}
        <nav className="fixed top-0 w-full border-b border-gray-800 bg-gray-900/50 backdrop-blur-md z-50">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
              <span className="font-bold tracking-tight text-gray-200">GESTURE.AI</span>
            </div>
            <div className="text-xs text-gray-500 font-mono hidden sm:block">
              TFJS_MODEL_V1.0
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}