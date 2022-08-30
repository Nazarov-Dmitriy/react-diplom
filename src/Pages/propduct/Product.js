import React, { useEffect, useState } from "react";
import { useGetProducQuery } from "../../Store/API/customApi";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function Product() {
  const { id } = useParams();
  const [productArr, setProductArr] = useState();
  const { isLoading, data } = useGetProducQuery(`items/${id}`);
  const [countArr, setCount] = useState({
    flag: false,
    count: 1,
  });
  const navigate = useNavigate();

  console.log(countArr);
  useEffect(() => {
    setProductArr(data);
  }, [data]);

  const handleSelected = (size, e) => {
    e.preventDefault();
    setCount({ ...countArr, flag: true });
    setProductArr((prevActive) => ({
      ...prevActive,
      sizes: prevActive.sizes.map((o) => {
        return { ...o, selected: o.size === size };
      }),
    }));
  };

  const handleGoCart = (e) => {
    e.preventDefault();
    if (countArr.flag) {
      navigate("/cart");
    }
  };

  const handleCount = (operator) => {
    if (countArr.count === 1 && operator === "-") {
      return false;
    }
    if (countArr.count === 10 && operator === "+") {
      return false;
    }
    if (operator === "-") {
      setCount((prevState) => ({
        ...prevState,
        count: +prevState.count - 1,
      }));
    }
    if (operator === "+") {
      setCount((prevState) => ({
        ...prevState,
        count: +prevState.count + 1,
      }));
    }
  };

  return (
    <main className="container">
      {isLoading && <Loader />}
      {productArr && (
        <div className="row">
          ;
          <div className="col">
            <div className="banner">
              <img
                src={require("../../img/banner.jpg")}
                className="img-fluid"
                alt="К весне готовы!"
              />
              <h2 className="banner-header">К весне готовы!</h2>
            </div>
            <section className="catalog-item">
              <h2 className="text-center">{productArr.title}</h2>
              <div className="row">
                <div className="col-5">
                  <img
                    src={productArr.images[0]}
                    className="img-fluid"
                    alt={productArr.title}
                  />
                </div>
                <div className="col-7">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <td>Артикул</td>
                        <td>{productArr.sku}</td>
                      </tr>
                      <tr>
                        <td>Производитель</td>
                        <td>{productArr.manufacturer}</td>
                      </tr>
                      <tr>
                        <td>Цвет</td>
                        <td>{productArr.color}</td>
                      </tr>
                      <tr>
                        <td>Материалы</td>
                        <td>{productArr.material}</td>
                      </tr>
                      <tr>
                        <td>Сезон</td>
                        <td>{productArr.season}</td>
                      </tr>
                      <tr>
                        <td>Повод</td>
                        <td>{productArr.reason}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="text-center">
                    <p>
                      Размеры в наличии:
                      {productArr.sizes.map((item) => {
                        console.log(item);

                        return item.avalible ? (
                          <span
                            key={item.size}
                            className={`catalog-item-size ${
                              item.selected && "selected"
                            }`}
                            onClick={(e) => handleSelected(item.size, e)}
                          >
                            {item.size}
                          </span>
                        ) : null;
                      })}
                    </p>
                    <p>
                      Количество:
                      <span className="btn-group btn-group-sm pl-2">
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleCount(`-`)}
                        >
                          -
                        </button>
                        <span className="btn btn-outline-primary">
                          {countArr.count}
                        </span>
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleCount(`+`)}
                        >
                          +
                        </button>
                      </span>
                    </p>
                  </div>
                  {productArr.sizes ? (
                    <button
                      className="btn btn-danger btn-block btn-lg"
                      onClick={(e) => {
                        handleGoCart(e);
                      }}
                    >
                      В корзину
                    </button>
                  ) : null}
                </div>
              </div>
            </section>
          </div>
        </div>
      )}
    </main>
  );
}
