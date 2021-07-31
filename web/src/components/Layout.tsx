import React from "react";
import Header from "./Header";

const Layout = ({ children }: any) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
