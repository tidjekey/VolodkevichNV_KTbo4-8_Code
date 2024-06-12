"use client";


import { getAllCarpetsClient, getCarpetById } from "@/lib/api/carpet.api";
import { useCartContext } from "@/lib/contexts/cartContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// TODO use cart api
const OrderList = ({ orderParam }: { orderParam: any }) => {
  const { addItem, removeItem, cart } = useCartContext();

  const [carpets, setCarpets] = useState<any>([]);

  useEffect(() => {
    if (!orderParam || orderParam == "cart") {
      getAllCarpetsClient().then((data) =>
        setCarpets(data.filter(({ id }: { id: any }) => cart.includes(id)))
      );
    } else {
      getCarpetById(orderParam).then((data : any) => setCarpets([data]));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("neworder", JSON.stringify(carpets));
  }, [carpets]);

  return (
    <div className="min-w-[320rem]">
      <div className="sticky top-[60rem] self-start border_accent_3 rounded-[12rem] ">
        <div className="p-[16rem]">
          {carpets &&
            carpets.length > 0 &&
            carpets.map((e: any, i: number) => (
              <div
                key={e.id + "_" + i}
                className={
                  "flex gap-[12rem]" + (i == 0 ? "" : " pt-[16rem] border_top")
                }
              >
                <Image
                  src={`data:image/png;base64,${e.img}`}
                  alt={""}
                  width={84}
                  height={99}
                  className="w-[84rem] h-auto max-h-[99rem] border_accent_3 rounded-[10rem]"
                />
                <div className="flex flex-col items-start justify-between">
                  <div className="flex flex-col">
                    <div className="text__main">{e.title}</div>
                    <div className="text-[10rem]">{e.style}</div>
                  </div>
                  <div className="text__main">
                    {e.price.toLocaleString("ru-RU")}₽
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="bg_accent py-[24rem] flex flex-col gap-[4rem] items-center mb-[-1rem] mr-[-1rem] rounded-b-[12rem]">
          <div className="text__main">Итого</div>
          <div className="text__price">
            {(carpets.length > 0
              ? carpets.reduce((acc: any, value: any) => (acc += value.price), 0)
              : 0
            ).toLocaleString("ru-RU")}
            ₽
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
