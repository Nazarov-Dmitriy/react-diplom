import React from "react";
import TopSales from "./TopSales";
import MainCatalog from "./MainCatalog";

export default function Main() {
  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <div className="banner">
            <img
              src={require("../../img/banner.jpg")}
              className="img-fluid"
              alt="К весне готовы!"
            />
            <h2 className="banner-header">К весне готовы!</h2>
          </div>
          <TopSales />
          <section className="catalog">
            <h2 className="text-center"> Каталог </h2>
            <MainCatalog />
          </section>
        </div>
      </div>
    </main>
  );
}
