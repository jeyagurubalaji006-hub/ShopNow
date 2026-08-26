import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OAuthSuccess from "./components/OAuthSuccess";
import Login from "./components/Login";
import Register from "./components/Register";
import ShopNow from "./components/ShopNow";
import TermsOfUse from "./components/TermsOfUse";
import PrivacyPolicy from "./components/PrivacyPolicy";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/oauth2/success" element={<OAuthSuccess />} />
        <Route path="/shop" element={<ShopNow />} />
        <Route path="/terms" element={<TermsOfUse />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;