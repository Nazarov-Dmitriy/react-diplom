import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetCatalogItemsQuery } from "../../Store/API/customApi";
import { selectId, addUrlCatalog, addData } from "../../Store/catalogSlice";
import {
  addButtonFlag,
  hiddenButtonState,
  addhiddenButtonLoadMore,
  addButtonFlagSearch,
} from "../../Store/hiddenButtonLoaded";
import { search, addInputFlag } from "../../Store/searchSlice";

import ItemsCatalog from "./ItemsCatalog";
import Loader from "../../Pages/Loader/Loader";

export default function ListCatalog() {
  const dispatch = useDispatch();
  const {
    catalogSlice: { cancelDoubleLoadingFlag, changeId, url },
  } = useSelector(selectId);
  const { input, searchFlag, inputFlag } = useSelector(search);
  const { data, isLoading } = useGetCatalogItemsQuery(url);
  const { buttonFlag,  buttonFlagSearch } =
    useSelector(hiddenButtonState);

  useEffect(() => {
    if (changeId) {
      dispatch(
        addUrlCatalog({ buttonFlag, searchFlag, input, buttonFlagSearch })
      );
      dispatch(addButtonFlagSearch(false));
    }
    if (searchFlag && !buttonFlag && !buttonFlagSearch) {
      dispatch(
        addUrlCatalog({ buttonFlag, searchFlag, input, buttonFlagSearch })
      );
      dispatch(addButtonFlag(false));
    }
    if (buttonFlag && !searchFlag) {
      dispatch(
        addUrlCatalog({ buttonFlag, searchFlag, input, buttonFlagSearch })
      );
      dispatch(addButtonFlag(false));
    }

    if (searchFlag && buttonFlagSearch && buttonFlag) {
      dispatch(
        addUrlCatalog({ buttonFlag, searchFlag, input, buttonFlagSearch })
      );
      dispatch(addButtonFlag(false));
    }

    if (input === "" && inputFlag) {
      dispatch(
        addUrlCatalog({
          buttonFlag,
          searchFlag,
          input,
          buttonFlagSearch,
          inputFlag,
        })
      );
      dispatch(addInputFlag(false));
    }
  }, [
    changeId,
    dispatch,
    buttonFlag,
    searchFlag,
    input,
    buttonFlagSearch,
    inputFlag,
  ]);

  useEffect(() => {
    if (!cancelDoubleLoadingFlag) {
      if (data !== undefined) {
        if (data.length < 6) {
          dispatch(addhiddenButtonLoadMore(true));
        }
        dispatch(addData({ data }));
      }
    }
  }, [data, dispatch, cancelDoubleLoadingFlag]);

  return (
    <>
      <div className="row"> {isLoading ? <Loader /> : <ItemsCatalog />} </div>
    </>
  );
}
