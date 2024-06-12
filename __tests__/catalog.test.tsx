import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Suspense } from "react";
import Catalog from "@/app/catalog/page";

// Мокирование компонентов CatalogFilter, CatalogSort и CatalogList
jest.mock("@/pages/catalogFilter", () => () => <div>Mocked CatalogFilter</div>);
jest.mock("@/pages/catalogSort", () => () => <div>Mocked CatalogSort</div>);
jest.mock("@/pages/catalogList", () => ({ query, currentPage }: any) => (
  <div>Mocked CatalogList - Query: {query}, Page: {currentPage}</div>
));

describe("Catalog component", () => {
  it("renders the main heading", () => {
    render(<Catalog searchParams={{}} />);
    const heading = screen.getByText("Каталог");
    expect(heading).toBeInTheDocument();
  });

  it("renders the CatalogFilter component", () => {
    render(<Catalog searchParams={{}} />);
    const catalogFilter = screen.getByText("Mocked CatalogFilter");
    expect(catalogFilter).toBeInTheDocument();
  });

  it("renders the CatalogSort component", () => {
    render(<Catalog searchParams={{}} />);
    const catalogSort = screen.getByText("Mocked CatalogSort");
    expect(catalogSort).toBeInTheDocument();
  });

  it("renders the CatalogList component with correct props", () => {
    const searchParams = { query: "test", page: "2" };
    render(<Catalog searchParams={searchParams} />);
    const catalogList = screen.getByText("Mocked CatalogList - Query: test, Page: 2");
    expect(catalogList).toBeInTheDocument();
  });

  it("displays fallback content while CatalogList is loading", () => {
    jest.mock("@/pages/catalogList", () => () => new Promise(() => {}));
    render(<Catalog searchParams={{}} />);
    const fallback = screen.getByText("Загрузка");
    expect(fallback).toBeInTheDocument();
  });
});