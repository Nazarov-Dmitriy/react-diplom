import React, { useState, useEffect } from "react";
import { addId, selectId, cancelDoubleLoading } from "../../Store/catalogSlice";
import { useDispatch, useSelector } from "react-redux";
import { addhiddenButtonLoadMore,addButtonFlagSearch } from "../../Store/hiddenButtonLoaded";

export default function ListCategory() {
  const { catalogSlice } = useSelector(selectId);
  const [active, setActive] = useState();
  const dispatch = useDispatch();

  const handleClick = (id, e) => {
    e.preventDefault();
    setActive((prevActive) =>
      prevActive.map((o) => {
        return { ...o, active: o.id === id };
      })
    );
    dispatch(addId(id));
    dispatch(addhiddenButtonLoadMore(false));
    dispatch(cancelDoubleLoading(false));
    dispatch(addButtonFlagSearch(false));

  };

  useEffect(() => {
    setActive(catalogSlice.listCategory);
  }, [catalogSlice.listCategory]);

  return active?.map((item) => {
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
}
