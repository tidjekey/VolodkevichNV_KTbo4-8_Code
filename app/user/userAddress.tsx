"use client";
import Button from "@/components/ui/button/button";
import { useInput } from "@/lib/hooks/useInput";
import React, { useState } from "react";

const UserAddress = ({ address }: any) => {
  const [edit, setEdit] = useState(false);

  const addressInp = useInput("");

  const onUpdate = () => {
    //updateUser({ name: name.value, email: email.value, phone: phone.value })
    //  .then((res) => {
    //    console.log("ok");
    //  })
    //  .catch((err) => console.log(err));
  };

  const onCancel = () => {
    setEdit(false);
  };

  return (
    <div className="bg_accent rounded-[10rem] py-[26rem] px-[32rem] flex flex-col gap-[20rem]">
      <div className="flex justify-between items-center">
        <div className="text-[28rem] font-[700]">Адрес доставки</div>
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
      <div className="flex flex-col flex-1 gap-[8rem] ">
        {edit ? (
          <input className="input" placeholder="Адрес" {...addressInp} />
        ) : address ? (
          <div>{address.name}</div>
        ) : (
          <div className="text-[14rem]">Добавленного адреса нет</div>
        )}
      </div>
    </div>
  );
};

export default UserAddress;
