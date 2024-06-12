import Heading from "@/components/ui/heading";
import CatalogFilter from "./catalogFilter";
import CatalogSort from "./catalogSort";
import CatalogList from "./catalogList";
import { Suspense } from "react";

const serialize = function(obj: any) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

const Catalog = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {

  const query = serialize(searchParams) ?? '' ;
  const currentPage = Number(searchParams?.page) || 1;


  return (
    <main className="catalog">
      <Heading>Каталог</Heading>
      <div className="ml-[165rem] flex gap-[30rem]">
        <CatalogFilter />
        <div className="w-full flex flex-col mr-[126rem]">
          <CatalogSort />
          <Suspense key={query + currentPage} fallback={<div>Загрузка</div>}>
            <CatalogList query={query} currentPage={currentPage} />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default Catalog;
