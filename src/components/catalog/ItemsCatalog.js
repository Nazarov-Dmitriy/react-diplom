import React from "react";
import ItemCatalog from "./ItemCatalog";
import { selectId } from "../../Store/catalogSlice";
import { useSelector } from "react-redux";
import { search } from "../../Store/searchSlice";


export default function CatalogList() {
  const { catalogSlice } = useSelector(selectId);
  const { searchFlag } = useSelector(search);

  return (
    <>
    {catalogSlice.dataCatalog?.map((item) => {
        return <ItemCatalog key={item.id} {...item} />;
      })}
    {searchFlag && catalogSlice.dataCatalog.length <= 0 && <div className="notFound"> Результаты поиска не найдены</div>}

    </>
  );
}
