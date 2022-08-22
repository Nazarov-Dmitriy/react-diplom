import React, { useState, useEffect } from "react";
import CatalogCategories from "./CatalogCategories";
import CatalogItems from "./CatalogItems";
import { selectId } from "../../Store/mainSlice";
import { useSelector, useDispatch } from "react-redux";
import { addUrlCatalog, removeChangeId } from "../../Store/mainSlice";

export default function Catalog() {
  const { mainSlice } = useSelector(selectId);
  const [loadedItem, setloadedItem] = useState([
    {
      loadCategory: "",
      count: "0",
    },
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mainSlice.id) {
      if (loadedItem[0].loadCategory !== "All") {
        dispatch(
          addUrlCatalog(
            `http://localhost:7070/api/items?categoryId=${loadedItem[0].loadCategory}&offset=${loadedItem[0].count}`
          )
        );
      } else {
        dispatch(
          addUrlCatalog(
            `http://localhost:7070/api/items?offset=${loadedItem[0].count}`
          )
        );
      }
    }
  }, [dispatch, loadedItem, mainSlice.id]);

  useEffect(() => {
    if (mainSlice.id) {
      if (mainSlice.id !== "All") {
        dispatch(
          addUrlCatalog(
            `http://localhost:7070/api/items?categoryId=${mainSlice.id}`
          )
        );
      } else {
        dispatch(addUrlCatalog(`http://localhost:7070/api/items`));
      }
    }
  }, [dispatch, mainSlice.id]);

  const loadItem = (id, e) => {
    e.preventDefault();
    setloadedItem((prevLoadedItem) =>
      prevLoadedItem.map((item) => {
        if (item.loadCategory !== id || mainSlice.changeId) {
          dispatch(removeChangeId());
          return { ...item, loadCategory: id, count: 6 };
        }
        return { ...item, count: item.count + 6 };
      })
    );
  };

  return (
    <>
      <CatalogCategories />
      <CatalogItems />
      <div className="text-center">
        {mainSlice.hiddenButtonLoadMore || (
          <button
            className="btn btn-outline-primary"
            onClick={(e) => loadItem(mainSlice.id, e)}
          >
            Загрузить ещё
          </button>
        )}
      </div>
    </>
  );
}
