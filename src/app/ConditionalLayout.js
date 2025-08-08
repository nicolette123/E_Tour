// app/ConditionalLayout.js
"use client";
import { usePathname } from "next/navigation";
import Header from "./../components/NavigationComponent/Header/Header";
import Footer from "./../components/NavigationComponent/Footer/Footer";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  
  const isDashboard = pathname?.includes("/collection") || pathname?.startsWith("/admin") || pathname?.startsWith("/agent") || pathname?.startsWith("/cliant");

  return (
    <>
      {/* Header - hidden on dashboard/collection pages */}
      {!isDashboard && <Header />}
      
      <main className="main-content-wrapper">
        {children}
      </main>
      {!isDashboard && <Footer />}
    </>
  );
}