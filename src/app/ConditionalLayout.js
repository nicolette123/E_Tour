// app/ConditionalLayout.js
"use client";
import { usePathname } from "next/navigation";
import Header from "./../components/NavigationComponent/Header/Header";
import Footer from "./../components/NavigationComponent/Footer/Footer";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname?.includes("/collection") || pathname?.includes("/dashboard");

  return (
    <>
      {/* Header - hidden on dashboard/collection pages */}
      <div style={{ display: isDashboard ? "none" : "block" }}>
        <Header />
      </div>
      
      <main className="main-content-wrapper">
        {children}
      </main>
      
      {/* Footer - hidden on dashboard/collection pages */}
      <div style={{ display: isDashboard ? "none" : "block" }}>
        <Footer />
      </div>
    </>
  );
}