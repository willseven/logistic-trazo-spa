import { StateCreator } from "zustand";
import { Menu } from "../types";

export type MenuSlice = {
  menuList: Menu[],
  setMenuList: (menuList: Menu[]) => void
}

export const createMenuSlice: StateCreator<MenuSlice> = (set) => ({
  menuList: [],
  setMenuList: (menuList) => set({ menuList }),
});