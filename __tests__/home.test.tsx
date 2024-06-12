import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { useRouter } from "next/navigation";
import Home from "@/app/page";

const router = useRouter()

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/image", () => (props: any) => <img {...props} />);

describe("Home component", () => {
  
  it("renders the main title", () => {
    render(<Home />);
    const mainTitle = screen.getByText(/Найди свой/i);
    expect(mainTitle).toBeInTheDocument();
  });

  it("renders the order button in the title section", () => {
    render(<Home />);
    const orderButton = screen.getByRole("link", { name: /Заказать/i });
    expect(orderButton).toBeInTheDocument();
    expect(orderButton).toHaveAttribute("href", "/catalog");
  });

  it("renders the title image", () => {
    render(<Home />);
    const titleImage = screen.getByAltText("title");
    expect(titleImage).toBeInTheDocument();
  });

  it("renders the 'Особенности' section title", () => {
    render(<Home />);
    const featuresTitle = screen.getByText(/Особенности/i);
    expect(featuresTitle).toBeInTheDocument();
  });

  it("renders the 'Качество' subsection", () => {
    render(<Home />);
    const qualitySubtitle = screen.getByText(/Качество/i);
    expect(qualitySubtitle).toBeInTheDocument();
  });

  it("renders the AI image with alt text 'ai'", () => {
    render(<Home />);
    const aiImage = screen.getByAltText("ai");
    expect(aiImage).toBeInTheDocument();
  });

  it("renders the AI subsection", () => {
    render(<Home />);
    const aiSubtitle = screen.getByText(/Искусственный интеллект/i);
    expect(aiSubtitle).toBeInTheDocument();
  });

  it("renders the 'Получите свой индивидуальный дизайн' section title", () => {
    render(<Home />);
    const customDesignTitle = screen.getByText(/Получите свой индивидуальный дизайн/i);
    expect(customDesignTitle).toBeInTheDocument();
  });

  it("renders the secondary order button", () => {
    render(<Home />);
    const secondaryOrderButton = screen.getByRole("link", { name: /Сделать заказ/i });
    expect(secondaryOrderButton).toBeInTheDocument();
    expect(secondaryOrderButton).toHaveAttribute("href", "/catalog");
  });

  it("renders the 'Создай свой уникальный дизайн' subsection", () => {
    render(<Home />);
    const createDesignSubtitle = screen.getByText(/Создай свой/i);
    expect(createDesignSubtitle).toBeInTheDocument();
  });

  it("renders the create design button", () => {
    render(<Home />);
    const createDesignButton = screen.getByRole("link", { name: /Создать/i });
    expect(createDesignButton).toBeInTheDocument();
    expect(createDesignButton).toHaveAttribute("href", "/ai");
  });
});