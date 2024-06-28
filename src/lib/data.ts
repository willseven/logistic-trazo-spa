import { RegisterUserForm } from "@/app/dashboard/userManagement/new/RegisterUserForm";
import { api } from "./api";
import { Rol, UpdateUserResponse } from "./types";

/**
 * Sets the authorization token in the Axios instance headers.
 * If a token is provided, it sets the Authorization header to `Bearer ${token}`.
 * If no token is provided, it removes the Authorization header.
 *
 * @param {string | undefined | null} token - The authorization token to set. If undefined or null, the Authorization header will be removed.
 */
function setAuthToken(token: string | undefined | null) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

/**
 * Obtiene los roles mediante una llamada a la api
 * @returns {Promise<Rol[]>}
 */
export async function fetchRoles(): Promise<Rol[]> {
  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  setAuthToken(token);
  const response = await api.get("rol", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function postUser(data: RegisterUserForm) {
  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  setAuthToken(token);
  const response = await api.post("/Auth/register", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function fetchUserById(id: string): Promise<UpdateUserResponse> {
  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  setAuthToken(token);
  const response = await api.get(`/Users/${id}/GetUserId`);
  return response.data;
}
