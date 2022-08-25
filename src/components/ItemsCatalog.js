import React from "react";
import { selectId } from "../Store/catalogSlice";
import { useSelector } from "react-redux";
import { search } from "../Store/searchSlice";

export default function CatalogList() {
  const { catalogSlice } = useSelector(selectId);
  const { searchFlag, searchData } = useSelector(search);

  const Item = (item) => {
    return (
      <div className="col-4">
        <div className="card catalog-item-card">
          <img
            src={item.images[0]}
            className="card-img-top img-fluid"
            alt={item.title}
          />
          <div className="card-body">
            <p className="card-text"> {item.title} </p>
            <p className="card-text"> {item.price} </p>
            <a href="/products/1.html" className="btn btn-outline-primary">
              Заказать
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {!searchFlag &&
        catalogSlice.data?.map((item) => {
          return <Item key={item.id} {...item} />;
        })}

      {searchFlag && searchData.length > 0 ? (
        searchData?.map((item) => {
          return <Item key={item.id} {...item} />;
        })
      ) : (
        <div className="notFound"> Результаты поиска не найдены</div>
      )}
    </>
  );
}
