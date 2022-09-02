import React, { useState, useEffect, createRef } from "react";
import { useAddPostMutation } from "../../Store/API/customApi";
import { clearProduct, addOrderSendFlag } from "../../Store/cartSlice";
import { useDispatch } from "react-redux";
import Loader from "../Loader/Loader";

export default function CartForm() {
  const [addPost, { isSuccess, isLoading }] = useAddPostMutation();
  const [clearState, setClearState] = useState(false);
  const [dataForm, setdataForm] = useState({
    phone: "",
    address: "",
  });
  const dispatch = useDispatch();
  const refCheckcbox = createRef();
  useEffect(() => {
    if (isSuccess && !clearState) {
      setdataForm({ ...dataForm, phone: "", address: "" });
      localStorage.clear();
      dispatch(clearProduct());
      dispatch(addOrderSendFlag(true));
      setClearState(true);
      refCheckcbox.current.checked = false;
    }
  }, [clearState, dataForm, dispatch, isSuccess, refCheckcbox]);

  const handleSubmit = (e) => {
    if (localStorage.length > 0) {
      e.preventDefault();
      let post = {
        owner: {
          address: dataForm.address,
          phone: dataForm.phone,
        },
        items: [],
      };
      Object.keys(localStorage).forEach((key) => {
        const { id, price, count } = JSON.parse(localStorage[key]);
        post.items.push({ id: id, price: price, count: count });
      });
      addPost(post).unwrap();
    }
  };

  const handleFocus = (e) => {
    e.target.value = "+" + 7;
  };

  const handleChange = ({ target }) => {
    if (target.value.length < 12 && target.name === "phone") {
      target.value = target.value.replace(/[а-яА-Яa-zA-Z]/gi, "");
    }
    setdataForm({ ...dataForm, [target.name]: target.value });
  };

  return (
    <section className="order">
       {isLoading && <Loader />}
      {isSuccess && <h2 className="text-center"> Заказ успешно оформлен</h2>}
      
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="phone">Телефон</label>
            <input
              className="form-control"
              id="phone"
              placeholder="Ваш телефон"
              required
              pattern="\+[0-9]{1,4}[0-9]{1,10}|(.*)@(.*)\.[a-z]{2,5}"
              title="+7(___)___-__-__"
              onFocus={handleFocus}
              onChange={(e) => handleChange(e)}
              maxLength="12"
              name="phone"
              value={dataForm.phone}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Адрес доставки</label>
            <input
              className="form-control"
              id="adress"
              placeholder="Адрес доставки"
              required
              minLength="3"
              name="address"
              value={dataForm.address}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group form-check">
            <input
              ref={refCheckcbox}
              type="checkbox"
              className="form-check-input"
              id="agreement"
              required
            />
            <label className="form-check-label" htmlFor="agreement">
              Согласен с правилами доставки
            </label>
          </div>
          <button type="submit" className="btn btn-outline-secondary">
            Оформить
          </button>
        </form>
      </div>
    </section>
  );
}
