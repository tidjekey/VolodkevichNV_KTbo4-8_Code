"use client";
import { getCurrentUser } from "@/lib/api/api";
import { getCarpetById } from "@/lib/api/carpet.api";
import { getUserOrders } from "@/lib/api/order.api";
import { statusTranslate } from "@/lib/consts/status.consts";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const UserHistory = () => {
  const [user, setUser] = useState<any>({});
  const [orders, setOrders] = useState<any>([]);

  useEffect(() => {
    getUserOrders()
      .then((data) => setOrders(data))
      .catch((err) => console.log(err));

    getCurrentUser()
      .then((data) => setUser(data))
      .catch((err) => console.log(err));

    console.log(user);
  }, []);

  useEffect(() => {
    console.log(orders);
  }, [orders]);

  return (
    <div className="bg_accent rounded-[10rem] py-[26rem] px-[32rem] flex flex-col gap-[20rem]">
      <div className="flex justify-between items-center">
        <div className="text-[28rem] font-[700]">Мои заказы</div>
        {/*<Link className="text-[18rem]" href="/user/history">
          Детальная информация
        </Link>*/}
      </div>
      <table className="table-auto text-left">
        <thead className="uppercase ">
          <tr className="border-y border-white border-solid">
            <th className="py-[12rem]">Заказ №</th>
            <th className="py-[12rem]">Ковер</th>
            <th className="py-[12rem]">Дата</th>

            <th className="py-[12rem]">Статус</th>
          </tr>
        </thead>
        <tbody>
          {user && orders?.length ? (
            orders.map((e: any, key: any) => (
              <tr key={key} className="border-b border-white border-solid">
                <td className="py-[12rem]">
                  <span>{e.id}</span>
                </td>
                <td className="py-[12rem]">
                  <Link className="flex gap-[12rem] items-end" href={`/catalog/${e.carpet_id}`}>
                    <Image
                      width={40}
                      height={40}
                      className="w-[40rem] h-auto"
                      src={`data:image/png;base64,${e.carpet.img}`}
                      alt={e.carpet.title + "_" + e.carpet_id}
                    />
                    {e.carpet.title}
                  </Link>{" "}
                </td>
                <td>
                  <span>{moment(e.create_at).format("DD.MM.YYYY")}</span>
                </td>
                <td>
                  <span>
                    {statusTranslate[e.status as keyof typeof statusTranslate]}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <div className="text-[14rem]">
              Заказов пока не было. Нужно это исправить!
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserHistory;
