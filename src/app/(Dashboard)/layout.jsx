// app/dashboard/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import SideBar from "../../components/NavigationComponent/SideBar";
import TopBar from "../../components/NavigationComponent/TopBar";
import StatsCard from "../../components/NavigationComponent/StatsCard";
import DestinationCard from "../../components/NavigationComponent/DestinationCard";
import TripTable from "../../components/NavigationComponent/TripTable";
import "./layout.css";

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
  title: "Echoes of Rwanda - Dashboard",
  description: "Echoes of Rwanda platform dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    // This div will override the main app layout
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="dashboard-body">
        <div className="dashboard-container">
          <SideBar />
          <div className="main-content">
            <TopBar title="Dashboard" />
            <div className="content-body">
              <div className="dashboard-children">
                {children}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}