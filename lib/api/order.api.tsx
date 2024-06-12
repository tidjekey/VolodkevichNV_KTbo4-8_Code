import axios from "axios";
import apiServer from "./apiServer";

export const createOrder = async (payload: any) => {
  const { data } = await axios.post(`/api/v1/orders/create-order`, payload, {
    withCredentials: true,
  });
  return data;
};

export const getAllOrders = async () => {
  try {
    const { data } = await apiServer.get(`orders/get-all-orders`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserOrders = async () => {
  try {
    const { data } = await axios.get(`/api/v1/orders/get-user-orders`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateOrder = async (payload: any, id: any) => {
  try {
    const { data } = await axios.post(`/api/v1/orders/create-order`, payload, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
