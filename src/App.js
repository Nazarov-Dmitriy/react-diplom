import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Main from "./Pages/Main/Main";
import Footer from "./Pages/Footer/Footer";
import Header from "./Pages/Header/Header";
import NotFound from "./Pages/404/NotFound";
import Catalog from "./Pages/Catalog/Catalog";
import About from './Pages/About/About';
import Contacts from "./Pages/Contacts/Contacts";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/catalog" exact element={<Catalog />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/contacts" exact element={<Contacts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
