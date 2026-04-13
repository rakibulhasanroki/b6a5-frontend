import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar/Navbar";
import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
};

export default PublicLayout;
