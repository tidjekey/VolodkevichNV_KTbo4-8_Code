import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import CatalogCard from "@/app/catalog/catalogCard";
import { getUserCarpets } from "@/lib/api/carpet.api";

const History = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  const userCarpets = await getUserCarpets(session.user.id);
  return (
    <div className="mt-[68rem] bg_accent rounded-[10rem] py-[26rem] px-[32rem] flex flex-col gap-[20rem]">
      <div className="flex justify-between items-center">
        <div className="text-[28rem] font-[700]">Мои ковры</div>
      </div>
      <div className="flex flex-col flex-1 gap-[8rem] ">
        {userCarpets?.length ? userCarpets.map((e: any, i: any) => (
          <CatalogCard
            key={e.id + i}
            id={e.id}
            title={e.title}
            img={e.image}
            price={e.price}
            style={e.style}
          />
        )) : 'У вас пока нет созданных ковров'}
      </div>
    </div>
  );
};

export default History;
