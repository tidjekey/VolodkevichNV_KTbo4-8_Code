"use client";

import React from "react";
import Logo from "./ui/logo";
import Link from "next/link";
import Button from "./ui/button/button";
import { usePathname } from "next/navigation";
import NavbarCart from "./navbarCart";

const navbarLinks = [
  {
    href: "/",
    label: "Главная",
  },
  {
    href: "/catalog",
    label: "Каталог",
  },
  {
    href: "/gallery",
    label: "Галерея",
  },
  {
    href: "/contacts",
    label: "Контакты",
  },
];

const Navbar = () => {
  const path = usePathname();

  return (
    <div className="h-[86rem] flex items-center justify-center relative">
      <Logo />
      <nav className="ml-[223rem] mr-[188rem]">
        <ul className="flex gap-[24rem] ">
          {navbarLinks.map((e, i) => (
            <li
              key={"navlink_" + i}
              className={e.href == path ? "link_active" : ""}
            >
              <Link href={e.href}>{e.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center gap-[29rem]">
        <Link
          href="/ai"
          className="w-[210rem] py-[11rem] btn btn_primary text__btn_small"
        >
          Сгенерировать дизайн
        </Link>
        <div className="flex items-center gap-[25rem]">
          <Link href={"/user"} className={"btn_icon"}>
            <svg
              style={{ width: "18rem", height: "20rem" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 20"
              fill="none"
            >
              <path
                d="M8.78906 0C5.88129 0 3.51562 2.36566 3.51562 5.27344C3.51562 8.18121 5.88129 10.5469 8.78906 10.5469C11.6968 10.5469 14.0625 8.18121 14.0625 5.27344C14.0625 2.36566 11.6968 0 8.78906 0Z"
                fill="#63AA73"
              />
              <path
                d="M15.3502 13.992C13.9065 12.5261 11.9925 11.7188 9.96094 11.7188H7.61719C5.58563 11.7188 3.67164 12.5261 2.22789 13.992C0.791211 15.4507 0 17.3763 0 19.4141C0 19.7377 0.262344 20 0.585938 20H16.9922C17.3158 20 17.5781 19.7377 17.5781 19.4141C17.5781 17.3763 16.7869 15.4507 15.3502 13.992Z"
                fill="#63AA73"
              />
            </svg>
          </Link>
          <NavbarCart />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
