import Heading from "@/components/ui/heading";
import Image from "next/image";
import React from "react";


import picle_img from '@/assets/gallery/picle.png'
import bart_img from '@/assets/gallery/bart.png'
import angel_img from '@/assets/gallery/angel.png'
import rickandmorty_img from '@/assets/gallery/rickandmorty.png'


const Gallery = () => {
  return (
    <main className="pb-[100rem]">
      <Heading>Галерея</Heading>
      <div className="mt-[60rem] w-full flex gap-[40rem] justify-center">
        <Image className="border_accent_3 rounded-[10rem]" src={picle_img} alt="" />
        <div className="flex flex-col gap-[40rem]">
        <Image className="border_accent_3 rounded-[10rem]" src={bart_img} alt="" />
        <Image className="border_accent_3 rounded-[10rem]" src={angel_img} alt="" />
        </div>
        <Image className="border_accent_3 rounded-[10rem]" src={rickandmorty_img} alt="" />
      </div>
    </main>
  );
};

export default Gallery;
