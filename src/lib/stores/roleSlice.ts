import { StateCreator } from "zustand";
import { Rol } from "../types";

export type RoleSlice = {
  roles: Rol[],
  currentRole: Rol | null,
  setRoles: (roles:Rol[]) => void,
  setCurrentRole: (role:Rol | null) => void,
}

export const createRoleSlice: StateCreator<RoleSlice> = (set) => ({
  roles: [],
  currentRole: null,
  setRoles: (roles) => set({ roles }),
  setCurrentRole: (role) => set({ currentRole: role }),
});