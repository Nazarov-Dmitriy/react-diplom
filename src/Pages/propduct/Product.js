import React, { useEffect, useState } from "react";
import { useGetProducQuery } from "../../Store/API/customApi";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { addProduct } from "../../Store/cartSlice";
import { useDispatch } from "react-redux";

export default function Product() {
  const { id } = useParams();
  const [productArr, setProductArr] = useState();
  const { isLoading, data } = useGetProducQuery(`items/${id}`);
  const [countArr, setCount] = useState({
    flag: false,
    count: 1,
    size: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setProductArr(data);
  }, [data]);

  const handleSelected = (size, e) => {
    e.preventDefault();
    setCount({ ...countArr, flag: true, size: size });
    setProductArr((prevActive) => ({
      ...prevActive,
      sizes: prevActive.sizes.map((o) => {
        return { ...o, selected: o.size === size };
      }),
    }));
  };

  const handleGoCart = (e) => {
    if (countArr.flag) {
      e.preventDefault();
      dispatch(addProduct());
      if (countArr.flag) {
        navigate("/cart");
      }
      let countLocal = countArr.count;

      if (localStorage.getItem(`${id}${countArr.size}`)) {
        const local = JSON.parse(localStorage.getItem(`${id}${countArr.size}`));
        countLocal += local.count;
      }

      localStorage.setItem(
        `${id}${countArr.size}`,
        JSON.stringify({
          title: productArr.title,
          price: productArr.price,
          size: countArr.size,
          count: countLocal,
          id: +id,
        })
      );
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
                alt="?? ?????????? ????????????!"
              />
              <h2 className="banner-header">?? ?????????? ????????????!</h2>
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
                        <td>??????????????</td>
                        <td>{productArr.sku}</td>
                      </tr>
                      <tr>
                        <td>??????????????????????????</td>
                        <td>{productArr.manufacturer}</td>
                      </tr>
                      <tr>
                        <td>????????</td>
                        <td>{productArr.color}</td>
                      </tr>
                      <tr>
                        <td>??????????????????</td>
                        <td>{productArr.material}</td>
                      </tr>
                      <tr>
                        <td>??????????</td>
                        <td>{productArr.season}</td>
                      </tr>
                      <tr>
                        <td>??????????</td>
                        <td>{productArr.reason}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="text-center">
                    <p>
                      ?????????????? ?? ??????????????:
                      {productArr.sizes.map((item) => {
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
                      ????????????????????:
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
                      ?? ??????????????
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
