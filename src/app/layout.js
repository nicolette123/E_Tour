// app/layout.js (Root Layout - Enhanced)
import { Open_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "./ConditionalLayout";
import ErrorBoundary from "../components/common/ErrorBoundary.jsx";

// Primary font for body text - Open Sans is excellent for readability
const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap", // Improves loading performance
  weight: ["300", "400", "500", "600", "700", "800"], // Multiple weights for flexibility
});

// Elegant serif font for headings - Playfair Display for tourism elegance
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Echoes of Rwanda - Tourism Management System",
  description: "Complete tourism management platform for admins, agents, and travelers in Rwanda",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${openSans.variable} ${playfairDisplay.variable}`}>
      <head>
        <meta name="color-scheme" content="light" />
      </head>
      <body className={`font-sans antialiased ${openSans.className}`} style={{ fontFamily: 'var(--font-open-sans), system-ui, sans-serif' }}>
        <ErrorBoundary>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </ErrorBoundary>
      </body>
    </html>
  );
}