import { node } from "prop-types";
import React from "react";
import Footer from "./footer/Footer";
import Header from "./header/Header";
import Main from "./main/Main";

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </React.Fragment>
  );
}

Layout.propTypes = {
  children: node.isRequired,
};
