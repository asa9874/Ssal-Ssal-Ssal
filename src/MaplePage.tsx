import React from "react";
import MapleShowcase from "./components/MapleShowcase";
import MapleHeader from "./components/MapleHeader";

const MaplePage: React.FC = () => {
  return (
    <>
      <MapleHeader />
      <MapleShowcase />
    </>
  );
};

export default MaplePage;
