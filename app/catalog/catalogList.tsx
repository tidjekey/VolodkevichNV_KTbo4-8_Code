import React from "react";
import CatalogCard from "./catalogCard";
import { getCatalogCarpets } from "@/lib/api/carpet.api";


const CatalogList = async ({ query, currentPage }: any) => {
  const capets = await getCatalogCarpets(query, currentPage);

  return (
    <div className="mt-[60rem] flex flex-wrap -mb-4 gap-[30rem]">
      {capets?.length
        ? capets.map((e: any) => <CatalogCard key={"card_" + e.id} {...e} />)
        : "Ковры не найдены"}
    </div>
  );
};

export default CatalogList;
