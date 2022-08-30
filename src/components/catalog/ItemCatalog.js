import React from "react";
import { Link } from "react-router-dom";

export default function ItemCatalog(item) {
  const url = `/catalog/${item.id}`;

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
          <Link to={url} className="btn btn-outline-primary">
            Заказать
          </Link>
        </div>
      </div>
    </div>
  );
}
