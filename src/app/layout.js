// app/layout.js (Root Layout - Improved)
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import 'remixicon/fonts/remixicon.css';
import ConditionalLayout from "./ConditionalLayout";

// Primary font for body text - Inter is excellent for readability
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Improves loading performance
  weight: ["300", "400", "500", "600", "700"], // Multiple weights for flexibility
});

// Monospace font for code - JetBrains Mono is popular and readable
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Echoes of Rwanda",
  description: "Echoes of Rwanda platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  );
}