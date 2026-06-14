import api from "@/config/axios";
import { User, UserHandle } from "@/types/user";
import { isAxiosError } from "axios";

export const searchByHandle = async (handle: string): Promise<string> => {
  try {
    const { data } = await api.post<string>("/api/user/search", { handle });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const getUser = async (): Promise<User> => {
  try {
    const { data } = await api.get<User>("/api/user");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const updateProfile = async (formData: User): Promise<string> => {
  try {
    const { data } = await api.patch<string>("/api/user", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const uploadImage = async (file: File): Promise<{ data: { image: string } }> => {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const { data } = await api.post<{ data: { image: string } }>(
      "/api/user/image",
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const getUserByHandle = async (handle: string): Promise<UserHandle> => {
  try {
    const { data } = await api.get<UserHandle>(`/api/user/${handle}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};
