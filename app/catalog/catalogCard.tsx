'use client'
import Button from "@/components/ui/button/button";
import { useCartContext } from "@/lib/contexts/cartContext";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

interface Props {
  id: string,
  title: string,
  img: string
  price: number,
  style: string
}

const CatalogCard = ({id, title, img, price = 0, style } : Props) => {

  const { addItem, removeItem, cart } = useCartContext();

  const isInCart = cart.some((e) => e == id)
 
  return (
    <div className="catalog-card flex flex-col items-center justify-between w-[calc(33.3%-20rem)] pt-[40rem] pb-[16rem]">
      <Link href={`/catalog/${id}`} className="flex flex-col items-center justify-between">
        <Image
          src={`data:image/png;base64,${img}`}
          alt={title + "carpet image"}
          width={253}
          height={233}
          className="w-[100%] h-auto"
        />
        <div className="mt-[24rem]">{title}</div>
        <div className="mt-[4rem] text-[10rem]">{style}</div>
      </Link>

      <Button onClick={() => isInCart ? removeItem(id) : addItem(id)} className={"mt-[12rem] w-[210rem] py-[12rem] px-[12rem] mx-[8rem] text__main gap-[8rem] " + (isInCart ? ' btn_checked' : ' btn_primary ')}>
        <span className="w-full flex justify-center items-center">
          {price.toLocaleString("ru-RU")}₽
        </span>

        <ShoppingCart />
      </Button>
    </div>
  );
};

export default CatalogCard;
