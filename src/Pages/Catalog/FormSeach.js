import React, { useEffect, createRef } from "react";
import { useGetSearchItemsQuery } from "../../Store/API/customApi";
import { useSelector, useDispatch } from "react-redux";
import {
  addInput,
  search,
  removeSeachFlag,
  addSearchUrl,
  addSeachData,
  searchHeaderFlag,
  addSearchFocusFlag,
  addInputHeader,
} from "../../Store/searchSlice";
import {
  selectId,
  hiddenButtonLoadMore,
  cancelDoubleLoading,
} from "../../Store/catalogSlice";

export default function FormSeach() {
  const { input, searchFlag, searchUrl, inputHeader, searchFocusFlag } =
    useSelector(search);
  const { data, isSuccess } = useGetSearchItemsQuery(searchUrl);
  const dispatch = useDispatch();
  const { catalogSlice } = useSelector(selectId);
  const refFocus = createRef();

  const handkeForm = (e) => {
    e.preventDefault();
  };

  const handkeAddInput = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      if (e.target.value !== "") {
        dispatch(addInput(e.target.value.trim().toLowerCase()));
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value.trim() === "") {
      dispatch(removeSeachFlag());
    }
  };

  useEffect(() => {
    if (input && searchFlag) {
      if (catalogSlice.loadCategory !== "All") {
        dispatch(
          addSearchUrl(
            `http://localhost:7070/api/items?categoryId=${catalogSlice.loadCategory}&offset=${catalogSlice.count}&q=${input}`
          )
        );
      } else {
        dispatch(
          addSearchUrl(
            `http://localhost:7070/api/items?offset=${catalogSlice.count}&q=${input}`
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
    input,
  ]);

  useEffect(() => {
    if (searchFocusFlag) {
      refFocus.current.focus();
      refFocus.current.selectionStart = refFocus.current.value.length;
      refFocus.current.value = inputHeader;
      dispatch(addInputHeader(""));
      dispatch(addSearchFocusFlag(false));
      dispatch(searchHeaderFlag(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFocusFlag]);

  useEffect(() => {
    if (input && searchFlag) {
      if (catalogSlice.id !== "All") {
        dispatch(
          addSearchUrl(
            `http://localhost:7070/api/items?categoryId=${catalogSlice.id}&q=${input}`
          )
        );
      } else {
        dispatch(addSearchUrl(`http://localhost:7070/api/items?q=${input}`));
      }
    }
  }, [dispatch, catalogSlice.id, searchFlag, input]);

  useEffect(() => {
    if (isSuccess) {
      if (data.length < 6) {
        dispatch(hiddenButtonLoadMore(true));
      }
      dispatch(
        addSeachData({
          data: data,
          catalogId: catalogSlice.id,
          loadIdCatagory: catalogSlice.loadCategory,
        })
      );
      dispatch(cancelDoubleLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <form className="catalog-search-form form-inline" onSubmit={handkeForm}>
      <input
        className="form-control"
        placeholder="Поиск"
        onKeyPress={handkeAddInput}
        onChange={handleChange}
        defaultValue={searchFocusFlag ? inputHeader : ""}
        ref={refFocus}
      />
    </form>
  );
}
