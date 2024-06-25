export interface Root {
  token: string
  user: User
  rols: Rol[]
  rating: boolean
  companys: Company[]
  institutionParam: InstitutionParam[]
}

export interface User {
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

export interface Rol {
  id: number
  name: string
  label: string
  icon: any
  active: boolean
}

export interface Company {
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

export interface InstitutionParam {
  id: number
  code: string
  label: string
  value: string
}
