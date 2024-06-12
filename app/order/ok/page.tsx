import Button from "@/components/ui/button/button";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <main className="flex flex-col mt-[80rem] items-center">
      <div className="text__subtitle text_accent" >Заказ успешно создан</div>
      <div className="mt-[40rem] text__main ">С вами свяжутся в ближайшее время</div>
      <Link href='/' className={'w-[320rem] mt-[24rem] btn btn_primary py-[18rem]'} >На главную</Link>
    </main>
  );
};

export default page;
