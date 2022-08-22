import React from "react";
import { useGetTopSalesQuery } from "../../Store/API/customApi";
import Loader from "../Loader/Loader";

export default function TopSales() {
  const { data, isLoading, isSuccess } =
    useGetTopSalesQuery("");
 

  const TopSalesItem = () => {
    return (
      <div className="row">
        {isSuccess
          ? data.map((item) => {
              const reg = new RegExp(`([A-Za-zА-Яа-я]+)\\s+([A-Za-zА-Яа-я']+)`);
              return (
                <div className="col-4" key={item.id}>
                  <div className="card">
                    <img
                      src={item.images[0]}
                      className="card-img-top img-fluid"
                      alt={item.title}
                    />
                    <div className="card-body">
                      <p className="card-text">{item.title.match(reg)[0]}</p>
                      <p className="card-text">{item.price}</p>
                      <a
                        href="/products/1.html"
                        className="btn btn-outline-primary"
                      >
                        Заказать
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    );
  };
  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {isLoading ? <Loader /> : <TopSalesItem />}
    </section>
  );
}
