"use client";
import Button from "@/components/ui/button/button";
import { createCarpet } from "@/lib/api/carpet.api";
import { useInput } from "@/lib/hooks/useInput";
import React from "react";

const CreateCarpet = () => {
  const title = useInput("");
  const description = useInput("");
  const price = useInput(0);
  const discount = useInput(0);
  const image = useInput("");
  const size = useInput("");
  const style = useInput("");
  const material = useInput("");
  const pattern = useInput("");
  const color = useInput("");
  const shape = useInput("");

  const handleCreate = () => {

    console.log({
      title: title.value,
      description: description.value,
      price: price.value,
      discount: discount.value,
      img: image.value,
      style: style.value,
      material: material.value,
      size: size.value,
    });
    

    const data = createCarpet({
      title: title.value || 'title',
      description: description.value || 'description',
      price: price.value || 1000,
      discount: discount.value || 0,
      img: image.value || 'any',
      style: style.value || 'style',
      material: material.value || 'wool',
      size: size.value || '1m',
      pattern: pattern.value || 'any',
      color: color.value || 'any',
      form: shape.value || 'any'
    });
  };

  return (
    <div>
      createCarpet
      <div className=" text-black flex flex-col gap-[20rem]">
        <input placeholder="title" value={title.value} onChange={title.onChange} />
        <input placeholder="description" value={description.value} onChange={description.onChange} />
        <input type="number" placeholder="price" value={price.value} onChange={price.onChange} />
        <input type="number" placeholder="discount" value={discount.value} onChange={discount.onChange} />
        <textarea  placeholder="image" value={image.value} onChange={image.onChange} />
        <input  placeholder="size" value={size.value} onChange={size.onChange} />
        <input  placeholder="style" value={style.value} onChange={style.onChange} />
        <input  placeholder="material" value={material.value} onChange={material.onChange} />
        <input  placeholder="pattern" value={pattern.value} onChange={pattern.onChange} />
        <input  placeholder="color" value={color.value} onChange={color.onChange} />
        <input  placeholder="shape" value={shape.value} onChange={shape.onChange} />
        <Button onClick={handleCreate} className="btn_primary">
          Создать
        </Button>
      </div>
    </div>
  );
};

export default CreateCarpet;
