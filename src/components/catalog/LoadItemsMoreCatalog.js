import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addButtonFlag,
  hiddenButtonState,
  addButtonFlagSearch,
} from "../../Store/hiddenButtonLoaded";

export default function LoadItemsMoreCatalog() {
  const { hiddenButtonCatalog } = useSelector(hiddenButtonState);
  const dispatch = useDispatch();

  const loadItem = (e) => {
    e.preventDefault();
    dispatch(addButtonFlag(true));
    dispatch(addButtonFlagSearch(true));
  };

  return (
    <div className="text-center">
      {hiddenButtonCatalog || (
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
