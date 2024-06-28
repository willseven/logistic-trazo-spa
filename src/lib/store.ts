import { create } from "zustand";
import { persist } from "zustand/middleware"
import { UserSlice, createUserSlice } from "./stores/userSlice";
import { RoleSlice, createRoleSlice } from "./stores/roleSlice";
import { MenuSlice, createMenuSlice } from "./stores/menuSlice";

export const useUserStore = create<UserSlice & RoleSlice & MenuSlice>()(persist((...a) => ({
  ...createUserSlice(...a),
  ...createRoleSlice(...a),
  ...createMenuSlice(...a),
}),{
  name: "user-storage",
}));
