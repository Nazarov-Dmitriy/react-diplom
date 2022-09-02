import React, { useEffect, useState } from "react";
import { removeProduct } from "../../Store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { cart, addOrderSendFlag } from "../../Store/cartSlice";

export default function CartItems() {
  const [flag, setFlag] = useState(false);
  const [cartData, setCartData] = useState(localStorage);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();
  const { orderSendFlag } = useSelector(cart);

  const handleRemuveItem = (id) => {
    localStorage.removeItem(id);
    setCartData(localStorage);
    setFlag(true);
    setTotalAmount(0);
    dispatch(removeProduct());
  };

  useEffect(() => {
    if (orderSendFlag) {
      setCartData("");
      setTotalAmount(0);
      addOrderSendFlag(false);
    }
  }, [orderSendFlag, totalAmount]);

  useEffect(() => {
    flag &&
      Object.keys(cartData).forEach((key) => {
        const { price, count } = JSON.parse(cartData[key]);
        setTotalAmount((prev) => prev + price * count);
      });
    setFlag(false);
  }, [cartData, flag]);

  useEffect(() => {
    setFlag(true);
  }, []);

  return (
    <tbody>
      {cartData &&
        Object.keys(cartData).map((key, index) => {
          const { price, title, size, count } = JSON.parse(cartData[key]);
          return (
            <tr key={key}>
              <td>{index + 1}</td>
              <td>
                <a href="/products/1.html">{title}</a>
              </td>
              <td>{size}</td>
              <td>{count}</td>
              <td>{price} руб.</td>
              <td>{price * count} руб.</td>
              <td>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleRemuveItem(key)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          );
        })}
      <tr>
        <td colSpan="5" className="text-right">
          Общая стоимость
        </td>
        <td>{!orderSendFlag ? totalAmount : 0} руб.</td>
      </tr>
    </tbody>
  );
}
