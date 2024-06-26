import { StateCreator } from "zustand";
import { User, UserResponse } from "../types";

export type UserSlice = {
  userResponse: UserResponse;
  setUserResponse: (userResponse:UserResponse) => void
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  userResponse: {
    token: "",
    user: {} as User,
    rols: [],
    rating: false,
    companys: [],
    institutionParam: []
  },
  setUserResponse: (userResponse:UserResponse) => set({userResponse}),
})