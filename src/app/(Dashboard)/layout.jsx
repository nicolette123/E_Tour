// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import SideBar from "../../components/NavigationComponent/SideBar";
// import SideBar from "../../components/NavigationComponent/TopBar";

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
<div className="dashboard-container">
      <SideBar />
      <div className="main-content">
        {/* <TopBar title={"Dashboard"} /> */}
        {/* <div className="content-body">
          <StatsCard />
          <DestinationCard />
         <TripTable />
        </div> */}
      </div>
    </div>
  );
}