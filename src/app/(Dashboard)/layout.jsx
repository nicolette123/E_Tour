// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "../../components/NavigationComponent/SideBar";
import Topbar from "../../components/NavigationComponent/TopBar";

// Font configurations
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Echoes of Rwanda",
  description: "Echoes of Rwanda platform",
};

export default function RootLayout({ children }) {
  return (
    
      <body>
        <Topbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </body>
  );
}