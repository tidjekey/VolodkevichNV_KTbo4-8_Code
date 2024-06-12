"use client";
import Button from "@/components/ui/button/button";
import { register } from "@/lib/api/api";
import { useInput } from "@/lib/hooks/useInput";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const RegisterPageClient = () => {
  const email = useInput("");
  const password = useInput("");
  const confirmPassword = useInput("");

  const router = useRouter();

  const onSumbit = async () => {
    const data = await register({
      email: email.value,
      password: password.value,
    })

    const res = await signIn("credentials", {
      email: email.value,
      password: password.value,
      redirect: false,
    });

    if (res?.error) {
    } else {
      console.log("successfully registered");
      window.location.href = `/user`;
    }
    console.log(res);
  };
  return (
    <div>
      <div className="flex justify-center text__main">
        <div
          onClick={() => router.replace("/auth/login")}
          className="cursor-pointer relative pb-[18rem] w-[317rem] flex flex-col items-center"
          style={{ borderBottom: "1rem solid #ffffff" }}
        >
          <div>Вход</div>
        </div>
        <div
          onClick={() => router.replace("/auth/register")}
          className="cursor-pointer relative pb-[18rem] w-[317rem] flex flex-col items-center"
          style={{ borderBottom: "1rem solid #ffffff" }}
        >
          <div>Регистрация</div>
          <span className="rounded-[100rem] bg_accent absolute h-[6rem] w-full top-[38rem]"></span>
        </div>
      </div>
      <div className="text__subtitle text-center my-[30rem] ">Регистрация</div>
      <div className="flex flex-col mx-[100rem] gap-[10rem]">
        <input
          {...email}
          className="input"
          placeholder="Email"
          autoComplete="off"
        />
        <input
          {...password}
          type="password"
          className="input"
          placeholder="Пароль"
          autoComplete="off"
        />
        <input
          {...confirmPassword}
          type="password"
          className="input"
          placeholder="Повторите пароль"
          autoComplete="off"
        />
        <div
          className="flex items-center justify-end"
          style={{ color: "#939393" }}
        >
          <Link href={"/"}>Забыл пароль</Link>
        </div>
        <Button
          onClick={onSumbit}
          className=" self-center w-[210rem] py-[18rem] btn_primary"
        >
          Зарегистрироваться
        </Button>
      </div>
    </div>
  );
};

export default RegisterPageClient;
