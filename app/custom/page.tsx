// @ts-nocheck
"use client";
import Button from "@/components/ui/button/button";
import Heading from "@/components/ui/heading";
import Select from "@/components/ui/input/select";
import { createPersonalCarpet } from "@/lib/api/carpet.api";

import {
  colors,
  materials,
  patterns,
  shapes,
  sizes,
  styles,
} from "@/lib/consts/carpets.consts";
import { loadFile, rejectFiles } from "@/lib/files/files.service";
import { useInput } from "@/lib/hooks/useInput";
import { required } from "@/lib/validation/validators";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const Custom = () => {

  const router = useRouter()

  const description = useInput("", [required]);

  const style = useInput("", [required]);
  const material = useInput("", [required]);
  const pattern = useInput("", [required]);
  const size = useInput("", [required]);
  const color = useInput("", [required]);
  const shape = useInput("", [required]);

  const [encodedFiles, setEncodedFiles] = useState<EncodedFile[]>([]);
  const [errors, setErrors] = useState<ErrorFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: File[]) => {
    setErrors(rejectFiles(rejectedFiles)); // set/reset errors
    setEncodedFiles([]); // reset UI
    acceptedFiles.forEach((file: File) =>
      loadFile(file)
        .then((encFile) => setEncodedFiles((list) => [...list, encFile]))
        .catch((error) =>
          setErrors((list) => [
            ...list,
            {
              name: file.name,
              size: file.size,
              error,
            },
          ])
        )
    );
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: ["image/jpeg", "image/png", "image/gif", "image/*"],
    maxSize: 100000000, // 100 mb
    multiple: false,
    onDrop,
  });

  const handleOrder = () => {
    createPersonalCarpet({
      title: "user custom",
      description: description.value,
      price: 15000,
      discount: 2,
      img: encodedFiles[0].encoded.split(',')[1],
      style: style.value,
      material: material.value,
      size: size.value,
      pattern: pattern.value,
      color: color.value,
      shape: shape.value,
    }).then((e) => {
      console.log('newCarpet', e);
      router.push(`/order/create?order=${e.id}`);
    });
  };

  return (
    <main className="pb-[100rem]">
      <Heading>Индивидуальный дизайн</Heading>
      <div className="mt-[60rem] flex flex-col gap-[12rem]">
        <div className="flex items-stretch w-full gap-[12rem]">
          <label className="w-full">
            <div className="mb-[12rem]">Загрузите пример ковра или дизайна</div>
            {errors.length ? (
              <span className="text_warn">{errors.map((err) => err)}</span>
            ) : null}
            <div className="h-[256rem] relative flex items-center justify-center input cursor-pointer">
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {encodedFiles.length ? (
                  ""
                ) : (
                  <p>Перетащите файл или нажмите чтобы выбрать</p>
                )}
              </div>
              <div className="absolute flex gap-[12rem] items-center">
                {encodedFiles.map((file: File, idx: number) => {
                  return (
                    <div key={idx}>
                      <Image
                        width={200}
                        height={128}
                        alt={file.name}
                        src={file.encoded}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </label>
          <label className="w-full">
            <div className="mb-[12rem]">Описание</div>
            {description.error && (
              <span className="text_warn">{description.error}</span>
            )}
            <textarea
              placeholder="Опишите ковер, котрый хотели бы получить"
              className="w-full h-[256rem] input"
              value={description.value}
              onChange={description.onChange}
              onBlur={() => description.setDirty(true)}
            />
          </label>
        </div>
        <div className="flex items-stretch w-full gap-[12rem]">
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
        </div>

        <div className="flex items-stretch w-full gap-[12rem]">
          <label className="w-full">
            {pattern.error && (
              <span className="text_warn">{pattern.error}</span>
            )}
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
        </div>

        <div className="flex items-stretch w-full gap-[12rem]">
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

        <Button
          onClick={handleOrder}
          className="w-[320rem] self-center mt-[20rem] py-[18rem] btn_warn"
        >
          Оставить заявку
        </Button>
      </div>
    </main>
  );
};

export default Custom;
