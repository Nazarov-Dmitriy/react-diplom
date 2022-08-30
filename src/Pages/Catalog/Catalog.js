import React from "react";
import CatalogCategories from "../../components/categories/CatalogCategories";
import ListCatalog from "../../components/catalog/ListCatalog";
import LoadItemsMoreCatalog from "../../components/catalog/LoadItemsMoreCatalog";
import FormSeach from "./FormSeach";

export default function Catalog() {
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
          <section className="catalog">
            <h2 className="text-center">Каталог</h2>           
            <FormSeach />
            <CatalogCategories />
            <ListCatalog />
            <LoadItemsMoreCatalog />
          </section>
        </div>
      </div>
    </main>
  );
}
