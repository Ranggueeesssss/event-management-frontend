import apiClient from './client';

/**
 * ============================================================
 *  AUTH API FUNCTIONS
 *
 *  POST /auth/login  → Kirim email & password, dapatkan token + user info
 *  GET  /auth/me     → Verifikasi token aktif & dapatkan profil user
 * ============================================================
 */

/**
 * Login user
 * @param {string} email
 * @param {string} password
 * @returns {{ token: string, user: { id, name, email, role } }}
 */
export async function apiLogin(email, password) {
  const response = await apiClient.post('/auth/login', { email, password });
  return response.data;
}

/**
 * Ambil profil user yang sedang login (berdasarkan token di header)
 * Digunakan oleh ProtectedRoute untuk memverifikasi sesi aktif.
 * @returns {{ id: string, name: string, email: string, role: string }}
 */
export async function apiGetProfile() {
  const response = await apiClient.get('/auth/me');
  return response.data;
}
