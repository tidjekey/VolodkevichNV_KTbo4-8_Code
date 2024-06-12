import Heading from "@/components/ui/heading";
import React from "react";

const Contacts = () => {
  return (
    <main className="pb-[100rem]">
      <Heading
        text={
          "Чтобы заказать ковёр по индивидуальным требованиям<br/>Или задать любой интересующий вопрос"
        }
      >
        Напишите нам
      </Heading>
      <div className="ml-[60rem] text__btn max-w-[770rem] mt-[60rem] flex flex-col gap-[30rem]">
        <div className="rounded-[10rem] p-[20rem] flex items-center justify-between border_accent_3">
          <div>Почта</div>
          <a href="mailto:email@mail.ru" className="text_accent">email@mail.ru</a>
        </div>
        <div className="rounded-[10rem] p-[20rem] flex items-center justify-between border_accent_3">
          <div>Телефон</div>
          <a href="tel:+78005553535" className="text_accent">+7 800 555 35 35</a>
        </div>
        <div className="rounded-[10rem] p-[20rem] flex items-center justify-between border_accent_3">
          <div>Телеграм</div>
          <a href="#" className="text_accent">@silk_eye</a>
        </div>
      </div>
    </main>
  );
};

export default Contacts;
