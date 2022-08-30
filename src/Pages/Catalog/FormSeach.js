import React, { useEffect, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addInput,
  removeSeachFlag,
  addInputFlag,
  search,
  searchHeaderFlag,
  addSearchFocusFlag,
  addInputHeader,
} from "../../Store/searchSlice";
import { addhiddenButtonLoadMore } from "../../Store/hiddenButtonLoaded";

export default function FormSeach() {
  const dispatch = useDispatch();
  const {   inputHeader, searchFocusFlag } =
    useSelector(search);
  const refFocus = createRef();

  const handkeForm = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.value.trim() === "") {
      dispatch(removeSeachFlag());
      dispatch(addhiddenButtonLoadMore(false));
    }
  };

  const handkeAddInput = (e) => {
    if (
      (e.code === "Enter" || e.code === "NumpadEnter") &&
      e.target.value !== ""
    ) {
      dispatch(addInput(e.target.value.trim().toLowerCase()));
      dispatch(addhiddenButtonLoadMore(false));
      dispatch(addInputFlag(true));
    }
  };

    useEffect(() => {
      if (searchFocusFlag) {
        refFocus.current.focus();
        refFocus.current.selectionStart = refFocus.current.value.length;
        refFocus.current.value = inputHeader;
        dispatch(addInputHeader(""));
        dispatch(addSearchFocusFlag(false));
        dispatch(searchHeaderFlag(false));
      }},[dispatch, inputHeader, refFocus, searchFocusFlag])

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
