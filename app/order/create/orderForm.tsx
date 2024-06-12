"use client";

import Button from "@/components/ui/button/button";
import { getCurrentUser } from "@/lib/api/api";
import { createOrder } from "@/lib/api/order.api";
import { useInput } from "@/lib/hooks/useInput";
import { required, validEmail, validPhone } from "@/lib/validation/validators";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const OrderForm = () => {
  const router = useRouter();

  //@ts-ignore
  const [user, setUser] = useState<any>();

  const lastname = useInput("", [required]);
  const firstname = useInput("", [required]);
  const email = useInput("", [required, validEmail]);
  const phone = useInput("", [required, validPhone]);
  const address = useInput("", [required]);

  const [delivery, setDelivery] = useState<string | null>(null);
  const [payment, setPayment] = useState<string | null>(null);

  const handleOrder = () => {
    console.log("order created");

    const carpets = JSON.parse(localStorage.getItem("neworder") || "[]");

    if (!carpets.length) return;

    carpets.forEach((e: any) => {
      createOrder({
        user_id: user.id,
        carpet_id: e.id,
        status: "pending",
      })
        .then((data) => {
          console.log("created", data);
          localStorage.setItem("neworder", "");
          localStorage.setItem("cart", "");
          localStorage.setItem("neworder", "");
          localStorage.setItem("cart", "[]");
         
        })
        .catch((err) => console.log("create order error: ", err));
    });

    const text = `
    Новый заказ\n
    ${lastname.value} ${firstname.value}\n
    ${email.value}\n
    ${phone.value}\n
    ${address.value}\n
    Ковры: ${carpets.map((e: any) => e.id)}\n\n
    ${delivery} ${payment || ""}
    `;

    axios
      .get(
        `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_BOT_KEY}/sendMessage?chat_id=${process.env.NEXT_PUBLIC_CHAI_ID}&text=${text}`
      )
      .then((data) => {
        console.log(data);

        console.log("created", data);
        localStorage.setItem("neworder", "");
        localStorage.setItem("cart", "[]");
        router.replace("/order/ok");
        
      })
      .catch((e) => console.log("tg err", e));
  };

  useEffect(() => {
    getCurrentUser()
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (user?.email) {
      email.setValue(user.email);
    }
    if(user?.phone) {
      phone.setValue(user.phone)
    }
  }, [user]);

  return (
    <div className="w-[520rem] flex flex-col gap-[40rem]">
      <div className="flex flex-col gap-[10rem] border_accent_3 rounded-[12rem] p-[36rem]">
        <div className="mb-[24rem] text-[20rem] font-semibold">Данные</div>
        <input
          className="input"
          placeholder="Фамилия"
          name="lastname"
          value={lastname.value}
          onChange={lastname.onChange}
          onBlur={lastname.onChange}
        />
        {lastname.error && <span className="text_warn">{lastname.error}</span>}
        <input
          className="input"
          placeholder="Имя"
          name="firstname"
          value={firstname.value}
          onChange={firstname.onChange}
          onBlur={firstname.onChange}
        />
        {firstname.error && (
          <span className="text_warn">{firstname.error}</span>
        )}
        <input
          className="input"
          placeholder="Email"
          name="email"
          value={email.value}
          onChange={email.onChange}
          onBlur={email.onChange}
        />
        {email.error && <span className="text_warn">{email.error}</span>}
        <input
          className="input"
          placeholder="Телефон"
          name="phone"
          value={phone.value}
          onChange={phone.onChange}
          onBlur={phone.onChange}
        />
        {phone.error && <span className="text_warn">{phone.error}</span>}
        <input
          className="input"
          placeholder="Адрес"
          name="address"
          value={address.value}
          onChange={address.onChange}
          onBlur={address.onChange}
        />
        {address.error && <span className="text_warn">{address.error}</span>}
      </div>
      <div className="flex flex-col gap-[10rem] border_accent_3 rounded-[12rem] p-[36rem]">
        <div className="mb-[24rem] text-[20rem] font-semibold">Доставка</div>
        <ul id="delivery" className="flex flex-col gap-[14rem]">
          <li>
            <label className="label_checkbox label_checkbox_white py-[24rem] px-[20rem] w-full bg_accent flex items-center gap-[20rem] rounded-[5rem]">
              <input
                id="post"
                type="radio"
                className="checkbox"
                name="delivery"
                value={"post"}
                onClick={() => setDelivery("post")}
                checked={delivery == "post"}
              />
              <span></span>
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <div className="text__main">Почта Росии</div>
                  <div className="text__main text_black">от 5 дней</div>
                </div>
                <div className="text__price">от 350₽</div>
              </div>
            </label>
          </li>
          <li>
            <label className="label_checkbox label_checkbox_white py-[24rem] px-[20rem] w-full bg_accent flex items-center gap-[20rem] rounded-[5rem]">
              <input
                id="cdek"
                type="radio"
                className="checkbox"
                name="delivery"
                value={"cdek"}
                onClick={() => setDelivery("cdek")}
                checked={delivery == "cdek"}
              />
              <span></span>
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col">
                  <div className="text__main">СДЕК</div>
                  <div className="text__main text_black">от 3 дней</div>
                </div>
                <div className="text__price">от 450₽</div>
              </div>
            </label>
          </li>
        </ul>
      </div>
      {/*
       <div className="flex flex-col gap-[10rem] border_accent_3 rounded-[12rem] p-[36rem]">
        <div className="mb-[24rem] text-[20rem] font-semibold">Оплата</div>
        <ul id="payment" className="flex flex-col gap-[14rem]">
          <li>
            <label className="label_checkbox label_checkbox_white py-[24rem] px-[20rem] w-full bg_accent flex items-center gap-[20rem] rounded-[5rem]">
              <input
                id="post"
                type="radio"
                className="checkbox"
                name="payment"
                value={"post"}
                onClick={() => setPayment("sbp")}
                checked={payment == "sbp"}
              />
              <span></span>
              <div className="flex items-center justify-between w-full">
                <div className="text__main">Банковская карта</div>
              </div>
            </label>
          </li>
          <li>
            <label className="label_checkbox label_checkbox_white py-[24rem] px-[20rem] w-full bg_accent flex items-center gap-[20rem] rounded-[5rem]">
              <input
                id="cdek"
                type="radio"
                className="checkbox"
                name="payment"
                value={"cdek"}
                onClick={() => setPayment("card")}
                checked={payment == "card"}
              />
              <span></span>
              <div className="flex items-center justify-start w-full">
                <div className="text__main">СБП</div>
              </div>
            </label>
          </li>
        </ul>
      </div>
      */}

      <Button
        disabled={
          !lastname.value ||
          lastname.error ||
          !firstname.value ||
          firstname.error ||
          !email.value ||
          email.error ||
          !phone.value ||
          phone.error ||
          !address.value ||
          address.error ||
          !delivery
          // ||
          //!payment || JSON.parse(localStorage.getItem("neworder") || '[]').length == 0
        }
        onClick={handleOrder}
        className="btn_primary py-[20rem]"
      >
        Оформить заказ
      </Button>
    </div>
  );
};

export default OrderForm;
