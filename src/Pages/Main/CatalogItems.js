import React, { useState, useEffect } from "react";
import { useGetCatalogItemsQuery } from "../../Store/API/customApi";
import { selectId } from "../../Store/mainSlice";
import { useSelector, useDispatch } from "react-redux";
import {
  hiddenButtonLoadMore,
  cancelDoubleLoading,
} from "../../Store/mainSlice";
import Loader from "../Loader/Loader";

export default function CatalogItems() {
  const { mainSlice } = useSelector(selectId);
  const [listCatalog, setListCatalog] = useState([]);
  const { data, isSuccess, isLoading } = useGetCatalogItemsQuery(mainSlice.url);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      if (mainSlice.changeId && !mainSlice.cancelDoubleLoading) {
        setListCatalog([...data]);
      } else if (!mainSlice.cancelDoubleLoading) {
        setListCatalog((prevState) => [...prevState, ...data]);
      }

      if (data.length < 6) {
        dispatch(hiddenButtonLoadMore(true));
      }
      dispatch(cancelDoubleLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, mainSlice.cancelDoubleLoading]);

  const CatalogList = () => {
    return listCatalog?.map((item) => {
      return (
        <div className="col-4" key={item.id}>
          <div className="card catalog-item-card">
            <img
              src={item.images[0]}
              className="card-img-top img-fluid"
              alt={item.title}
            />{" "}
            <div className="card-body">
              <p className="card-text"> {item.title} </p>{" "}
              <p className="card-text"> {item.price} </p>{" "}
              <a href="/products/1.html" className="btn btn-outline-primary">
                Заказать{" "}
              </a>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      );
    });
  };

  return (
    <div className="row"> {isLoading ? <Loader /> : <CatalogList />} </div>
  );
}
