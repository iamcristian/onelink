import argon from "argon2";

export const hashPassword = async (password: string) => {
  return await argon.hash(password);
};

export const checkPassword = async (hash: string, password: string) => { 
  return await argon.verify(hash, password);
}