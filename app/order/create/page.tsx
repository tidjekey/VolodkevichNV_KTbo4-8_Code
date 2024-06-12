import Heading from "@/components/ui/heading";
import React, { Suspense } from "react";
import OrderForm from "./orderForm";
import OrderList from "./orderList";
import { Loader2 } from "lucide-react";

export const dynamic = "force-dynamic";

const CreateOrder = async ({
  searchParams,
}: {
  searchParams?: {
    order?: string;
  };
}) => {

  // TODO use getCarpetsByIds method
  //const carpets = await getAllCarpets();

  return (
    <main className="pb-[100rem]">
      <Heading>Оформление заказа</Heading>
      <div className="mt-[60rem] w-full flex gap-[60rem] justify-center">
        <Suspense
          fallback={
            <div>
              <Loader2 className="animate-spin mr-2" />
            </div>
          }
        >
          <OrderForm />
          <OrderList orderParam={searchParams?.order} />
        </Suspense>
      </div>
    </main>
  );
};

export default CreateOrder;
