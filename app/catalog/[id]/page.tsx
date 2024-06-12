"use client";
import Button from "@/components/ui/button/button";
import Heading from "@/components/ui/heading";
import { getCurrentUser } from "@/lib/api/api";
import { getCarpetById } from "@/lib/api/carpet.api";
import { addToUserCart } from "@/lib/api/personal.api";

import {
  colorsTranslate,
  materialsTranslate,
  patternsTranslate,
  shapesTranslate,
  sizesTranslate,
  styles,
  stylesTranslate,
} from "@/lib/consts/carpets.consts";
import { useCartContext } from "@/lib/contexts/cartContext";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Carpet {
  id: number;
  title: string;
  description: string;
  price: number;
  discount: number;
  img: string;
  style: string;
  material: string;
  size: string;
  form: string;
  color: string;
  pattern: string;
}

const CatalogCarpet = () => {
  const router = useRouter();

  const { addItem, removeItem, cart } = useCartContext();

  const { id } = useParams();

  const [carpet, setCarpet] = useState<Carpet>();

  useEffect(() => {
    getCarpetById(id)
      .then((data) => {
        setCarpet(data);
        console.log(data);
      })
      .catch((e) => console.log(e));
  }, []);

  const isInCart = cart.some((e) => e == id);

  const handleAddToCart = async () => {
    isInCart ? removeItem(id) : addItem(id);
  };

  if (!carpet) return;

  return (
    <main className="catalog ">
      <Heading>Ковер</Heading>
      <div className="mt-[70rem] mx-[164rem] flex gap-[50rem]">
        <div className="p-24">
          <Image
            src={`data:image/png;base64,${carpet.img}`}
            alt={""}
            width={664}
            height={664}
            className="w-[664rem] h-auto"
          />
        </div>
        <div className="w-[350rem] flex flex-col">
          <h2 className="text__subtitle text_accent">{carpet.title}</h2>
          <div className="text__main">{carpet.description}</div>
          <div className="mt-[20rem]">
            <div className="border_bottom pb-[4rem] flex flex-col gap-[8rem]">
              {carpet.style && (
                <div className="flex justify-between items-center">
                  <span>Стиль: </span>
                  <span>
                    {
                      stylesTranslate[
                        carpet.style as keyof typeof stylesTranslate
                      ]
                    }
                  </span>
                </div>
              )}

              {carpet.material && (
                <div className="flex justify-between items-center">
                  <span>Материал:</span>
                  <span>
                    {
                      materialsTranslate[
                        carpet.material as keyof typeof materialsTranslate
                      ]
                    }
                  </span>
                </div>
              )}

              {carpet.form && (
                <div className="flex justify-between items-center">
                  <span>Форма:</span>
                  <span>
                    {
                      shapesTranslate[
                        carpet.form as keyof typeof shapesTranslate
                      ]
                    }
                  </span>
                </div>
              )}

              {carpet.color && (
                <div className="flex justify-between items-center">
                  <span>Цвет:</span>
                  <span>
                    {
                      colorsTranslate[
                        carpet.color as keyof typeof colorsTranslate
                      ]
                    }
                  </span>
                </div>
              )}

              {carpet.pattern && (
                <div className="flex justify-between items-center">
                  <span>Узор:</span>
                  <span>
                    {
                      patternsTranslate[
                        carpet.pattern as keyof typeof patternsTranslate
                      ]
                    }
                  </span>
                </div>
              )}

              {carpet.size && (
                <div className="flex justify-between items-center">
                  <span>Размер:</span>
                  <span>
                    {sizesTranslate[carpet.size as keyof typeof sizesTranslate]}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="mt-[24rem] flex justify-between items-center gap-[20rem]">
            <Button
              onClick={handleAddToCart}
              className="w-[220rem] py-[18rem] btn_primary text__btn_medium"
            >
              Добавить в корзину
            </Button>
            <span className="text-[20rem] text-right">
              {carpet.price.toLocaleString("ru-RU")}₽
            </span>
          </div>
          <Button
            onClick={() => router.push(`/order/create?order=${id}`)}
            className="w-full py-[18rem] btn_warn text__btn_medium mt-[20rem]"
          >
            Заказать сейчас
          </Button>
        </div>
      </div>
    </main>
  );
};

export default CatalogCarpet;
