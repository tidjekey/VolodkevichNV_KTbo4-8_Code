"use client";
import Button from "@/components/ui/button/button";
import { deleteCarpetById } from "@/lib/api/carpet.api";

import React from "react";

const DeleteCarpet = ({ id }: any) => {
  const deleteCarpet = async () => {
    const res = await deleteCarpetById(id);
    console.log(res);
  };

  return (
    <Button className="py-[18rem] btn_warn" onClick={deleteCarpet}>Delete</Button>
  );
};

export default DeleteCarpet;
