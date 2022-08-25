import React, { useEffect } from "react";
import {
  cancelDoubleLoading,
  hiddenButtonLoadMore,
} from "../Store/catalogSlice";
import { selectId, addUrlCatalog, addData } from "../Store/catalogSlice";
import { useSelector, useDispatch } from "react-redux";
import { useGetCatalogItemsQuery } from "../Store/API/customApi";
import { search } from "../Store/searchSlice";
import ItemsCatalog from "./ItemsCatalog";
import Loader from "../Pages/Loader/Loader";

export default function ListCatalog() {
  const { catalogSlice } = useSelector(selectId);
  const { data, isSuccess, isLoading } = useGetCatalogItemsQuery(
    catalogSlice.url
  );
  const { searchFlag } = useSelector(search);


  const dispatch = useDispatch();

  useEffect(() => {
    if (catalogSlice.id && !searchFlag) {
      if (catalogSlice.loadCategory !== "All") {
        dispatch(
          addUrlCatalog(
            `http://localhost:7070/api/items?categoryId=${catalogSlice.loadCategory}&offset=${catalogSlice.count}`
          )
        );
      } else {
        dispatch(
          addUrlCatalog(
            `http://localhost:7070/api/items?offset=${catalogSlice.count}`
          )
        );
      }
    }
  }, [
    catalogSlice.loadCategory,
    catalogSlice.count,
    catalogSlice.id,
    dispatch,
    searchFlag,
  ]);

  useEffect(() => {
    if (catalogSlice.id && !searchFlag) {
      if (catalogSlice.id !== "All") {
        dispatch(
          addUrlCatalog(
            `http://localhost:7070/api/items?categoryId=${catalogSlice.id}`
          )
        );
      } else {
        dispatch(addUrlCatalog(`http://localhost:7070/api/items`));
      }
    }
  }, [dispatch, catalogSlice.id, searchFlag]);

  useEffect(() => {
    if (isSuccess) {
      if (data.length < 6) {
        dispatch(hiddenButtonLoadMore(true));
      }
      dispatch(addData(data));
      dispatch(cancelDoubleLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <div className="row"> {isLoading ? <Loader /> : <ItemsCatalog />} </div>
    </>
  );
}
