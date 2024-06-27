export type UserResponse = {
  token: string
  user: User
  rols: Rol[]
  rating: boolean
  companys: Company[]
  institutionParam: InstitutionParam[]
}

export type User = {
  id: number
  username: string
  name: string
  email: string
  fatherLastName: string
  motherLastName: string
  ci: string
  status: string
  phoneNumber: any
  cellphoneNumber: string
  photoUrl: any
  city: string
  accountNumber: string
  creationDate: string
  lastActive: string
}

export type Rol = {
  id: number
  name?: string
  label: string
  icon?: any
  active?: boolean
}

export type Company = {
  id: number
  razonSocial: string
  nit: string
  logoUrl: any
  status: string
  code: any
  num: string
  interno: any
  importador: any
  direccion: string
  ci?: string
  testimonio: any
  fundempresa: any
  email: string
  phone: string
  cicoin: any
  suma: any
  croquis: any
  foto: any
  fechaApertura: any
  gps: string
  categoria: string
  web: any
  sigla: any
  tipoCliente: any
  pais: any
  departamento: any
  ciudad: any
  domicilioLegal: any
  clasificacionCliente: any
  actividad: any
  pagaTributos: any
  descripcionNegocio: any
  details: any
  users: any
  userCompanys: any
  legalRepresentatives: any
  files: any
  procedures: any
  airGuides: any
  contacts: any
  companyDetails: any
  creationDate: string
  deleteDate: string
  updateDate: string
  creationUserId: number
  updateUserId: number
}

export type InstitutionParam = {
  id: number
  code: string
  label: string
  value: string
}

export type Menu = {
  id: number
  name: string
  label: string
  icon: string | null
  main: boolean
}

export type RoleMenu = {
  id: number
  name: string
  icon: null | string
  main: boolean
  menuList: Menu[]
  steps: any[] | number[]
}