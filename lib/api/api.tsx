import axios from "axios";
import apiServer from "./apiServer";

export const register = async (payload: any) => {
  try {
    const { data } = await axios.post(`/api/v1/auth/registration`, payload, {
      withCredentials: true,
    });
    return data;
  } catch (e) {
    console.log("error", e);

    return { error: e };
  }
};

export const login = async (payload: any) => {
  try {
    const { data } = await axios.post(`/api/v1/auth/login`, payload, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  const { data } = await axios.post(`/api/v1/auth/logout`, {
    withCredentials: true,
  });
  return data;
};

export const getUser = async (id: any) => {
  const { data } = await axios.get(`/api/v1/users/get-user?user_id=${id}`, {
    withCredentials: true,
  });
  return data;
};

export const getCurrentUser = async () => {
  try {
    const { data } = await axios.get(`/api/v1/auth/current-user`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUserServer = async () => {
  const { data } = await apiServer.get(`/api/v1/auth/current-user`, {
    withCredentials: true,
  });
  return data;
};

export const updateUser = async (payload: any) => {
  const { data } = await axios.post(`/api/v1/users/update`, payload, {
    withCredentials: true,
  });
  return data;
};

export const getAllUsers = async () => {
  try {
    const { data } = await apiServer.get(`users/get-all-users`, {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    console.log(error);
  }
};
