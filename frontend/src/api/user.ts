import api from "@/config/axios";
import { User, UserHandle } from "@/types/user";
import { isAxiosError } from "axios";

export async function searchByHandle(handle: string) {
  try {
    const { data } = await api.post<string>("/api/user/search", { handle });
    console.log(data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message);
  }
}

export async function getUser() {
  try {
    const { data } = await api.get<User>("/api/user");
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response)
      throw new Error(error.response.data.message);
  }
}

export async function updateProfile(formData: User) {
  try {
    const { data } = await api.patch<string>("/api/user", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  try {
    const data: { data: { image: string } } = await api.post(
      "/api/user/image",
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message);
    }
  }
}

export async function getUserByHandle(handle: string) {
  try {
    const { data } = await api<UserHandle>(`/api/user/${handle}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
