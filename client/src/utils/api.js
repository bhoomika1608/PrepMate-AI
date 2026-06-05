// Central API base URL — reads from Vite env var so it works in both
// development (http://localhost:5000) and production (Render backend URL).
export const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
