import React from "react";
import "./Layout.scss";
import Calculator from "../components/calculator/Calculator";
import Info from "../components/Info/Info";
function Layout() {
  return (
    <div className="Layout">
      <Info />
      <Calculator />
    </div>
  );
}

export default Layout;
