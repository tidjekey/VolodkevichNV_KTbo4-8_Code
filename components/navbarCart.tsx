"use client";

import React, { useEffect, useState } from "react";
import Button from "./ui/button/button";
import Image from "next/image";

import { useCartContext } from "@/lib/contexts/cartContext";
import { usePathname, useRouter } from "next/navigation";
import { getCarpetById } from "@/lib/api/carpet.api";
import { Trash } from "lucide-react";

const NavbarCart = () => {
  const path = usePathname();

  const router = useRouter();

  const [isOpen, setOpen] = useState(false);
  const [carpets, setCarpets] = useState<any[]>([]);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const { addItem, removeItem, cart } = useCartContext();

  const deleteCarpet = (id: any) => {
    removeItem(id);
  };

  useEffect(() => {
    (async () => {
      const newCarpets = await Promise.all(
        cart.map(async (id) => {
          console.log("carpet id", id);
          return getCarpetById(id);
        })
      );
      setCarpets(newCarpets); // Устанавливаем новый массив ковров
    })();
  }, [cart]);

  useEffect(() => {
    setOpen(false);
  }, [path]);

  useEffect(() => {
    console.log("CARPEEEETS", carpets);
  }, [carpets]);

  return (
    <>
      <Button onClick={handleOpen} type="button" className="btn_icon">
        <svg
          style={{ width: "24rem", height: "20rem" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 20"
          fill="none"
        >
          <path
            d="M10.6231 20C11.7276 20 12.6231 19.1046 12.6231 18C12.6231 16.8954 11.7276 16 10.6231 16C9.51848 16 8.62305 16.8954 8.62305 18C8.62305 19.1046 9.51848 20 10.6231 20Z"
            fill="#63AA73"
          />
          <path
            d="M17.334 20C18.4386 20 19.334 19.1046 19.334 18C19.334 16.8954 18.4386 16 17.334 16C16.2294 16 15.334 16.8954 15.334 18C15.334 19.1046 16.2294 20 17.334 20Z"
            fill="#63AA73"
          />
          <path
            d="M1.24479 1.33337H4.02491L7.24348 12.6006L6.99104 13.1055C6.32633 14.4335 7.29126 16 8.7801 16H20.0003C20.3688 16 20.667 15.7018 20.667 15.3333C20.667 14.9648 20.3688 14.6667 20.0003 14.6667H8.7801C8.28503 14.6667 7.96148 14.1454 8.18375 13.7018L8.36801 13.3333H20.0003C20.2978 13.3333 20.5595 13.1361 20.6416 12.8496L23.3082 3.5163C23.3655 3.31515 23.3252 3.09897 23.1995 2.93168C23.0732 2.76501 22.876 2.6667 22.667 2.6667H5.79246L5.16878 0.483732C5.08673 0.197288 4.82505 0 4.52749 0H1.24479C0.876302 0 0.578125 0.298177 0.578125 0.666665C0.578125 1.03515 0.876302 1.33337 1.24479 1.33337Z"
            fill="#63AA73"
          />
        </svg>
      </Button>

      <div
        className={`w-[366rem] z-10 top-[85rem] right-0 bg_accent ${
          isOpen ? "absolute" : "hidden"
        }`}
      >
        <div className="w-full h-[62rem] text-[32rem] flex items-center justify-center font-bold">
          Корзина
        </div>
        <div className="p-[16rem] bg_black flex flex-col gap-[12rem]">
          {/* cart product card */}
          {carpets && carpets.length > 0 ? (
            carpets.map(({ id, img, title, price, style }, i) => (
              <div
                key={id + "_" + i}
                className="flex gap-[12rem] pb-[16rem] border_bottom"
              >
                <Image
                  src={`data:image/png;base64,${img}`}
                  alt={""}
                  width={84}
                  height={99}
                  className="w-[84rem] h-auto max-h-[99rem] border_accent_3 rounded-[10rem]"
                />
                <div className="flex flex-col items-start justify-between">
                  <div className="flex flex-col">
                    <div className="text__main">{title}</div>
                    <div className="text-[10rem]">{style}</div>
                  </div>
                  <div className="text__main">
                    {price.toLocaleString("ru-RU")}₽
                  </div>
                </div>
                <div
                  className="self-start ml-auto cursor-pointer"
                  onClick={() => deleteCarpet(id)}
                >
                  <Trash />
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center">Корзина пустая</div>
          )}
        </div>
        <div className="bg_accent flex flex-col p-[20rem]">
          <div className="flex items-center justify-between pt-[6rem]">
            <div className="text__main">Итого</div>
            <div className="text__price">
              {(carpets.length > 0
                ? carpets.reduce((acc, value) => (acc += value.price), 0)
                : 0
              ).toLocaleString("ru-RU")}
              ₽
            </div>
          </div>
          <Button
            disabled={carpets.length == 0}
            onClick={() => router.push("/order/create?order=cart")}
            className="mt-[16rem] w-full py-[16rem] text__btn_medium btn btn_secondary"
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    </>
  );
};

export default NavbarCart;
