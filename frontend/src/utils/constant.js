const VITE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const API_BASE = VITE_API_URL.endsWith("/api/v1") ? VITE_API_URL : `${VITE_API_URL}/api/v1`;

export const USER_API_END_POINT = `${API_BASE}/user`;
export const JOB_API_END_POINT = `${API_BASE}/job`;
export const APPLICATION_API_END_POINT = `${API_BASE}/application`;
export const COMPANY_API_END_POINT = `${API_BASE}/company`;