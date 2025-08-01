import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./../components/NavigationComponent/Header/Header";
import Footer from "./../components/NavigationComponent/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Echos of Rwanda",
  description: "Echo of Rwanda pratiform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
