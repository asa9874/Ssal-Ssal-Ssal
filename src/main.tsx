import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import MaplePage from "./MaplePage";
import Home from "./pages/Home";
import RicePrice from "./pages/RicePrice";
import RiceSchedule from "./pages/RiceSchedule";
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/showcase" element={<MaplePage />} />
        <Route path="/rice-price" element={<RicePrice />} />
        <Route path="/rice-schedule" element={<RiceSchedule />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
