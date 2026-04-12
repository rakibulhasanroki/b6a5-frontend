import React from "react";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div>Navbar</div>
      <main>{children}</main>
      <div>Footer</div>
    </>
  );
};

export default PublicLayout;
