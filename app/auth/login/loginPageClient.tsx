"use client";
import Button from "@/components/ui/button/button";
import { login } from "@/lib/api/api";
import { useInput } from "@/lib/hooks/useInput";
import { EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPageClient = () => {
  const router = useRouter();

  const email = useInput("");
  const password = useInput("");

  const [show, setShow] = useState(false);
  const handleMouseDown = (e: any) => {
    e.preventDefault();
    setShow(true);
  };
  const handleMouseUp = (e: any) => {
    e.preventDefault();
    setShow(false);
  };

  const [error, setError] = useState("");

  const onSumbit = async () => {
    const res = await signIn("credentials", {
      email: email.value,
      password: password.value,
      redirect: false,
    });

    const data = await login({ email: email.value, password: password.value });

    console.log("DATAAAAAA", data);

    if (res?.ok) {
      console.log("successfully signed in");
      window.location.href = `/user`;
    } else {
      console.log("err: ", res);
      setError("Неверный логин или пароль");
    }
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
          <span className="rounded-[100rem] bg_accent absolute h-[6rem] w-full top-[38rem]"></span>
        </div>
        <div
          onClick={() => router.replace("/auth/register")}
          className="cursor-pointer relative pb-[18rem] w-[317rem] flex flex-col items-center"
          style={{ borderBottom: "1rem solid #ffffff" }}
        >
          <div>Регистрация</div>
        </div>
      </div>
      <div className="text__subtitle text-center my-[30rem] ">Вход</div>

      <div className="flex flex-col mx-[100rem] gap-[10rem]">
        {error && <div className="text_warn">{error}</div>}
        <input
          {...email}
          className="input"
          placeholder="Email"
          autoComplete="none"
        />
        <div className="relative">
          <input
            {...password}
            type={show ? "text" : "password"}
            autoComplete={"list"}
            aria-autocomplete="list"
            className="input w-full"
            placeholder="Пароль"
          />
          <button
            onTouchStart={handleMouseDown}
            onTouchCancel={handleMouseUp}
            type={"button"}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className="absolute right-[12px] top-[50%] translate-y-[-50%]"
          >
            {" "}
            <EyeOff />
          </button>
        </div>

        <div
          className="flex items-center justify-end"
          style={{ color: "#939393" }}
        >
          <span>Забыл пароль</span>
        </div>
        <Button
          onClick={onSumbit}
          className=" self-center w-[210rem] py-[18rem] btn_primary"
        >
          Войти
        </Button>
      </div>
    </div>
  );
};

export default LoginPageClient;
