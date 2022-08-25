import React from "react";
import { selectId } from "../Store/catalogSlice";
import { useSelector, useDispatch } from "react-redux";
import { loadMoreItems } from "../Store/catalogSlice";

export default function LoadItemsMoreCatalog() {
  const { catalogSlice } = useSelector(selectId);
  const dispatch = useDispatch();

  const loadItem = (e) => {
    e.preventDefault();
    dispatch(loadMoreItems());
  };

  return (
    <div className="text-center">
      {catalogSlice.hiddenButtonLoadMore || (
        <button
          className="btn btn-outline-primary"
          onClick={(e) => loadItem(e)}
        >
          Загрузить ещё
        </button>
      )}
    </div>
  );
}
