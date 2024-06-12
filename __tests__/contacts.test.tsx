import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Contacts from "@/app/contacts/page";

describe("Contacts component", () => {
  it("renders the main heading", () => {
    render(<Contacts />);
    const mainHeading = screen.getByText(/Напишите нам/i);
    expect(mainHeading).toBeInTheDocument();
  });

  it("renders the subheading with correct text", () => {
    render(<Contacts />);
    const subHeading = screen.getByText(/Чтобы заказать ковёр по индивидуальным требованиям/i);
    expect(subHeading).toBeInTheDocument();
  });

  it("renders the email link", () => {
    render(<Contacts />);
    const emailLink = screen.getByText(/email@mail.ru/i);
    expect(emailLink).toBeInTheDocument();
  });

  it("renders the phone link", () => {
    render(<Contacts />);
    const phoneLink = screen.getByText(/\+7 800 555 35 35/i);
    expect(phoneLink).toBeInTheDocument();
  });

  it("renders the telegram link", () => {
    render(<Contacts />);
    const telegramLink = screen.getByText(/@silk_eye/i);
    expect(telegramLink).toBeInTheDocument();
  });

  it("email link has correct href attribute", () => {
    render(<Contacts />);
    const emailLink = screen.getByText(/email@mail.ru/i);
    expect(emailLink).toHaveAttribute("href", "mailto:email@mail.ru");
  });

  it("phone link has correct href attribute", () => {
    render(<Contacts />);
    const phoneLink = screen.getByText(/\+7 800 555 35 35/i);
    expect(phoneLink).toHaveAttribute("href", "tel:+78005553535");
  });

  it("telegram link has correct href attribute", () => {
    render(<Contacts />);
    const telegramLink = screen.getByText(/@silk_eye/i);
    expect(telegramLink).toHaveAttribute("href", "#");
  });
});