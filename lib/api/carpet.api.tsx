import axios from "axios";
import apiServer from "./apiServer";

export const generateCarpet = async (payload: any) => {
  const { data } = await axios.post(
    `/api/v1/carpets/generate-carpet`,
    payload,
    { timeout: 30000, withCredentials: true }
  );

  return data;
};

export const getCarpetById = async (id: any) => {
  console.log(id);

  const { data } = await axios.get(
    `/api/v1/carpets/get-carpet?carpet_id=${id}`,
    { withCredentials: true }
  );
  return data;
};

export const getAllCarpetsClient = async (querry = "", currentPage = 1) => {
  const { data } = await axios.get(`/api/v1/carpets/get-all-carpets`, {
    withCredentials: true,
  });

  return data;
};

export const getCatalogCarpets = async (querry = "", currentPage = 1) => {
  try {
    const { data } = await apiServer.get(
      `carpets/get-public-carpets?${querry}`,
      {
        withCredentials: true,
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

// all capets (admin)
export const getAllCarpets = async (querry = "", currentPage = 1) => {
  try {
    const { data } = await apiServer.get(`carpets/get-all-carpets?${querry}`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};

// admin
export const createCarpet = async (payload: any) => {
  try {
    const { data } = await axios.post(
      `/api/v1/carpets/create-carpet`,
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

export const deleteCarpetById = async (id: number) => {
  try {
    const { data } = await axios.delete(
      `/api/v1/carpets/delete-carpet-by-id?carpet_id=${id}`,
      {
        withCredentials: true,
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createPersonalCarpet = async (payload: any) => {
  try {
    const { data } = await axios.post(
      `/api/v1/carpets/create-personal-carpet`,
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

export const getUserCarpets = async (payload: any) => {
  try {
    const { data } = await axios.get(`/api/v1/carpets/get-user-carpets`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
