import { useAuthStore } from "../store/authStore";

export const API = "https://forgetmenot-server.onrender.com";

export const apiFetch = async (url: string, options: RequestInit = {}) => {
  const token = useAuthStore.getState().token;

  const res = await fetch(`${API}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  // 토큰 만료 체크
  if (res.status === 401) {
    useAuthStore.getState().logout();
    window.location.href = "/login";
    return null;
  }

  return res;
};