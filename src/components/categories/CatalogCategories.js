import React, { useEffect } from "react";
import { useGetCategoriesQuery } from "../../Store/API/customApi";
import { addlistCategory } from "../../Store/catalogSlice";
import { useDispatch } from "react-redux";
import ListCategory from "./ListCategory";

export default function CatalogCategories() {
  const { data, isSuccess } = useGetCategoriesQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && isSuccess) {
      dispatch(
        addlistCategory({
          all: { id: "All", title: "Все", active: true },
          data,
        })
      );
    }
  }, [data, dispatch, isSuccess]);

  return (
    <ul className="catalog-categories nav justify-content-center">
      {isSuccess ? <ListCategory /> : null}
    </ul>
  );
}
