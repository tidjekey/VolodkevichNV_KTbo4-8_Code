import axios from "axios";
import { sources } from "next/dist/compiled/webpack/webpack";

export const getUserCart = async () => {
  try {
    const { data } = await axios.get(`/api/v1/personal-account/get-user-cart`, {
      withCredentials: true,
    });

    console.log("user cart", data);

    return data.map((e: any) => e.carpet_id);
  } catch (error) {
    console.log(error);
  }
};

export const addToUserCart = async (payload: { carpet_id: number }) => {
  try {
    const { data } = await axios.post(
      `/api/v1/personal-account/add-to-cart`,
      payload,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const removeFromCart = async (payload: { carpet_id: number }) => {
  try {
    const { data } = await axios.delete(
      `/api/v1/personal-account/remove-from-cart`,
      {
        data: payload,
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
