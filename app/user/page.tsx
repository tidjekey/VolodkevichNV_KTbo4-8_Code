import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/options";
import UserInfo from "./userInfo";
import UserHistory from "./userHistory";
import UserAddress from "./userAddress";
import { getAllOrders, getUserOrders } from "@/lib/api/order.api";

const User = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  console.log(session);

  

  return (
    <div className="mt-[68rem] flex flex-col gap-[32rem]">
      <UserInfo />
      <UserHistory/>
      {/* <UserAddress address={address} /> */}
    </div>
  );
};

export default User;
