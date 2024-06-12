import React from "react";
import CreateCarpet from "./createCarpet";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";

import Image from "next/image";
import Button from "@/components/ui/button/button";
import DeleteCarpet from "./deleteCarpet";
import { getAllCarpets } from "@/lib/api/carpet.api";
import { getAllOrders } from "@/lib/api/order.api";
import { getAllUsers } from "@/lib/api/api";

const Admin = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user.isAdmin) {
    //redirect('/')
  }

  const allCarpets = await getAllCarpets();

  const allOrders = await getAllOrders()

  const allUsers = await getAllUsers()

 

  return (
    <div>
      <CreateCarpet />
      <div className="mt-[100rem] flex flex-col gap-[8rem]">
        {allCarpets?.length && allCarpets.map((e: any, i: number) => (
          <div key={i} className="flex justify-between items-center">
            <Image
              width={64}
              height={64}
              alt=""
              src={`data:image/png;base64,${e.img}`}
            />
            <span>{e.id}</span>
            <span>{e.title}</span>
            <span>{e.description}</span>
            <span>{e.price}</span>
            <span>{e.discount}</span>
            <span>{e.style}</span>
            <span>{e.material}</span>
            <span>{e.size}</span>
            <span>{e.form}</span>
            <span>{e.color}</span>
            <span>{e.pattern}</span>
            <DeleteCarpet id={e.id} />
          </div>
        ))}
      </div>

      <div className="mt-[100rem] flex flex-col gap-[8rem]">
        {allOrders?.length && allOrders.map((e: any, i: number) => (
          <div key={i} className="flex justify-between">
            <span>user_id: {e.user_id}</span>
            <span>carpet_id: {e.carpet_id}</span>
            <span>status: {e.status}</span>
          </div>
        ))}
      </div>

      <div className="mt-[100rem] flex flex-col gap-[8rem]">
        {allUsers?.length && allOrders.map((e: any, i: number) => (
          <div key={i} className="flex justify-between">
            <span>user_id: {e.id}</span>
            <span>email: {e.email}</span>
            <span>is_admin: {e.is_admin}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
