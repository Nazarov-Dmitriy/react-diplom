import React, { useState, useEffect } from "react";
import { useGetCategoriesQuery } from "../Store/API/customApi";
import { addId, hiddenButtonLoadMore } from "../Store/catalogSlice";
import { useDispatch } from "react-redux";

export default function CatalogCategories() {
  const { data, isSuccess } = useGetCategoriesQuery();
  const [active, setActive] = useState([
    { id: "All", title: "Все", active: true },
  ]);
  const dispatch = useDispatch();

  const handleClick = (id, e) => {
    e.preventDefault();
    setActive((prevActive) =>
      prevActive.map((o) => {
        if (o.id === id) {
          return { ...o, active: true };
        } else {
          return { ...o, active: false };
        }
      })
    );
    dispatch(addId(id));
    dispatch(hiddenButtonLoadMore(false));
  };

  useEffect(() => {
    if (data) {
      setActive([...active, ...data]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const ListCategory = () => {
    return active.map((item) => {
      return (
        <li className="nav-item" key={item.id}>
          <a
            className={item.active ? "nav-link active" : "nav-link"}
            href="/#"
            onClick={(e) => handleClick(item.id, e)}
          >
            {item.title}
          </a>
        </li>
      );
    });
  };

  return (
    <ul className="catalog-categories nav justify-content-center">
      {isSuccess ? (
        <>
          <ListCategory />
        </>
      ) : null}
    </ul>
  );
}
