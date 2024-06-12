"use client";
import Button from "@/components/ui/button/button";
import { getCurrentUser, logout, updateUser } from "@/lib/api/api";
import { useInput } from "@/lib/hooks/useInput";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";

const UserInfo = () => {
  const [user, setUser] = useState<any>();

  const name = useInput("");
  const email = useInput("");
  const phone = useInput("");

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        setUser(data);
        console.log("dataaaa", data);
       // if(user.email) email.setValue(user.email)
      })
      .catch((e) => {
        console.log(e);
        onLogout()
      });
  }, []);

  const onLogout = () => {
    logout().then((res) => {
      signOut();
      console.log("ok");
    });
  };

  const onUpdate = () => {
    updateUser({ name: name.value, email: email.value, phone: phone.value })
      .then((res) => {
        console.log("ok");
      })
      .catch((err) => console.log(err));
  };

  const onCancel = () => {
    setEdit(false);
  };

  const [edit, setEdit] = useState(false);

  if (!user) return <></>;

  return (
    <>
      <Button
        onClick={() => onLogout()}
        className=" self-end btn_primary bg_warn text-[22rem] w-[230rem] py-[11rem]"
      >
        Выйти
      </Button>
      <div className=" bg_accent rounded-[10rem] py-[26rem] px-[32rem] flex flex-col gap-[20rem]">
        <div className="flex justify-between items-center">
          <div className="text-[28rem] font-[700]">Персональная информация</div>
          {edit ? (
            <div className="flex gap-[8rem]">
              <Button
                onClick={onUpdate}
                className="btn_secondary py-[12rem] w-[220rem] text-[20rem]"
              >
                Сохранить
              </Button>
              <Button
                onClick={onCancel}
                className="btn_warn py-[12rem] w-[220rem] text-[20rem]"
              >
                Отменить
              </Button>
            </div>
          ) : (
            <span onClick={() => setEdit(true)} className="text-[18rem]">
              Редактировать
            </span>
          )}
        </div>

        <div className="flex flex-col gap-[12rem] max-w-[340rem]">
          <div className="flex items-center justify-between leading-[130%]">
            <div>Имя:</div>
            {edit ? (
              <input className="input" placeholder="Фамилия" {...name} />
            ) : (
              <div className="font-[700] text-[22rem]">{user?.name}</div>
            )}
          </div>
          <div className="flex items-center justify-between leading-[130%]">
            <div>Email:</div>
            {edit ? (
              <input className="input" placeholder="Email" {...email} />
            ) : (
              <div className="font-[700] text-[22rem]">{user?.email}</div>
            )}
          </div>
          <div className="flex items-center justify-between leading-[130%]">
            <div>Телефон:</div>
            {edit ? (
              <input className="input" placeholder="Телефон" {...phone} />
            ) : (
              <div className="font-[700] text-[22rem]">
                {user?.phone ?? ""}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
