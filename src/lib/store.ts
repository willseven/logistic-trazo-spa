import {create} from 'zustand'
import { Root, User } from './types'

type RootState = {
  root: Root;
  setRoot: (root:Root) => void
}


const useStore = create<RootState>((set)=>({
  root: {
    token: "",
    user: {} as User,
    rols: [],
    rating: false,
    companys: [],
    institutionParam: []
  },
  setRoot: (root:Root) => set({root}),
}))