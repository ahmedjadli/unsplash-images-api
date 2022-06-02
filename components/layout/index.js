import React from "react";
import Nav from "./navbar";

const Layout = ({ children, signoutHandler, user }) => {
  return (
    <div>
      <header>
        <Nav {...{ signoutHandler, user }} />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
