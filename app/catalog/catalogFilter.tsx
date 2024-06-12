//@ts-nocheck
"use client";

import Select from "@/components/ui/input/select";
import {
  colors,
  materials,
  patterns,
  shapes,
  sizes,
  styles,
} from "@/lib/consts/carpets.consts";
import { useInput } from "@/lib/hooks/useInput";
import { required } from "@/lib/validation/validators";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const CatalogFilter = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [size1, setSize] = useState(["any"]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<string | null>(null);

  const style = useInput("");
  const material = useInput("");
  const pattern = useInput("");
  const size = useInput("");
  const color = useInput("");
  const shape = useInput("");

  const handleSize = (e: any) => {
    if (e.target.value == "any") setSize(["any"]);
    if (size1.length == 0) setSize(["any"]);
    if (size1.includes(e.target.value))
      setSize((prev) => [...prev.filter((el) => el != e.target.value)]);
    else setSize((prev) => [...prev.filter((e) => e != "any"), e.target.value]);
  };

  useEffect(() => {
    if (size1.length == 0) setSize(["any"]);
  }, [size1]);

  useEffect(
    useDebouncedCallback(() => {
      const params = new URLSearchParams(searchParams);

      if (size1.includes("any")) {
        params.delete("size");
      } else {
        params.set("size", size1.join(","));
      }

      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      if (minPrice) {
        params.set("minprice", minPrice);
      } else {
        params.delete("minprice");
      }

      if (maxPrice) {
        params.set("maxprice", maxPrice);
      } else {
        params.delete("maxprice");
      }

      if (style.value) {
        params.set("style", style.value);
      } else {
        params.delete("style");
      }

      if (material.value) {
        params.set("material", material.value);
      } else {
        params.delete("material");
      }

      if (size.value) {
        params.set("size", size.value);
      } else {
        params.delete("size");
      }

      if (shape.value) {
        params.set("form", shape.value);
      } else {
        params.delete("form");
      }

      if (color.value) {
        params.set("color", color.value);
      } else {
        params.delete("color");
      }

      if (pattern.value) {
        params.set("pattern", pattern.value);
      } else {
        params.delete("pattern");
      }

      replace(`${pathname}?${params.toString()}`);
    }, 300),
    [
      minPrice,
      maxPrice,
      style.value,
      material.value,
      size.value,
      shape.value,
      color.value,
      pattern.value,
    ]
  );

  const handleSearch = (newSearch: string) => {
    setSearch(newSearch);
  };

  const handleMinPrice = (newMinPrice: string) => {
    setMinPrice(newMinPrice);
  };

  const handleMaxPrice = (newMaxPrice: string) => {
    setMaxPrice(newMaxPrice);
  };

  return (
    <div className="flex flex-col pr-[50rem] pt-[43rem] gap-[18rem] border_right_accent">
      <div>
        <label>
          <span>Стоимость</span>
          <div className="mt-[12rem] flex gap-[8rem]">
            <input
              type="number"
              placeholder="От"
              className="w-[120rem] input"
              defaultValue={searchParams.get("minprice")?.toString()}
              onChange={(e) => handleMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="До"
              className="w-[120rem] input"
              defaultValue={searchParams.get("maxprice")?.toString()}
              onChange={(e) => handleMaxPrice(e.target.value)}
            />
          </div>
        </label>
      </div>
      <div className=" flex flex-col gap-[12rem]">
        <label className="w-full">
          {style.error && <span className="text_warn">{style.error}</span>}
          <Select
            label="Стиль"
            defaultTitle="стиль ковра"
            value={style.value}
            onChange={style.onChange}
            onBlur={() => style.setDirty(true)}
            selectableValues={styles}
          />
        </label>
        <label className="w-full">
          {material.error && (
            <span className="text_warn">{material.error}</span>
          )}
          <Select
            label="Материал"
            defaultTitle="материал ковра"
            value={material.value}
            onChange={material.onChange}
            onBlur={() => material.setDirty(true)}
            selectableValues={materials}
          />
        </label>

        <label className="w-full">
          {pattern.error && <span className="text_warn">{pattern.error}</span>}
          <Select
            label="Узор"
            defaultTitle="узор ковра"
            value={pattern.value}
            onChange={pattern.onChange}
            onBlur={() => pattern.setDirty(true)}
            selectableValues={patterns}
          />
        </label>
        <label className="w-full">
          {size.error && <span className="text_warn">{size.error}</span>}
          <Select
            label="Размер"
            defaultTitle="размер ковра"
            value={size.value}
            onChange={size.onChange}
            onBlur={() => size.setDirty(true)}
            selectableValues={sizes}
          />
        </label>

        <label className="w-full">
          {color.error && <span className="text_warn">{color.error}</span>}
          <Select
            label="Цвет"
            defaultTitle="цвет ковра"
            value={color.value}
            onChange={color.onChange}
            onBlur={() => color.setDirty(true)}
            selectableValues={colors}
          />
        </label>
        <label className="w-full">
          {shape.error && <span className="text_warn">{shape.error}</span>}
          <Select
            label="Форма"
            defaultTitle="форму ковра"
            value={shape.value}
            onChange={shape.onChange}
            onBlur={() => shape.setDirty(true)}
            selectableValues={shapes}
          />
        </label>
      </div>
    </div>
  );
};

export default CatalogFilter;
