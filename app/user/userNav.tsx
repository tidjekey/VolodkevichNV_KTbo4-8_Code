"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const UserNav = () => {
  const router = useRouter();
  const path = usePathname();
  console.log(path);

  return (
    <div className="flex justify-center text__main">
      <div
        onClick={() => router.replace("/user")}
        className="cursor-pointer relative pb-[18rem] w-[317rem] flex flex-col items-center"
        style={{ borderBottom: "1rem solid #ffffff" }}
      >
        <div>Информация</div>
        {path == "/user" && (
          <span className="rounded-[100rem] bg_accent absolute h-[6rem] w-full top-[38rem]"></span>
        )}
      </div>
      <div
        onClick={() => router.replace("/user/history")}
        className="cursor-pointer relative pb-[18rem] w-[317rem] flex flex-col items-center"
        style={{ borderBottom: "1rem solid #ffffff" }}
      >
        <div>История заказов</div>
        {path == "/user/history" && (
          <span className="rounded-[100rem] bg_accent absolute h-[6rem] w-full top-[38rem]"></span>
        )}
      </div>
      <div
        onClick={() => router.replace("/user/support")}
        className="cursor-pointer relative pb-[18rem] w-[317rem] flex flex-col items-center"
        style={{ borderBottom: "1rem solid #ffffff" }}
      >
        <div>Поддержка</div>
        
        {path == "/user/support" && (
          <span className="rounded-[100rem] bg_accent absolute h-[6rem] w-full top-[38rem]"></span>
        )}
      </div>
    </div>
  );
};
