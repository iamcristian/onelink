import api from "@/config/axios";
import { LoginRequest, LoginResponse } from "@/types/auth";
import { registerUserSchema } from "@/schemas/userSchema";
import { z } from "zod";

type RegisterRequest = z.infer<typeof registerUserSchema>;

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post("/api/auth/login", data);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<{ message: string }> => {
  const response = await api.post("/api/auth/register", data);
  return response.data;
};
