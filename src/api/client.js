import axios from 'axios';

/**
 * ============================================================
 *  AXIOS API CLIENT — Gerbang sentral semua request HTTP
 *
 *  Semua request ke backend melewati instance ini sehingga:
 *  1. Token JWT otomatis disisipkan di setiap request
 *  2. Error 401 (token kedaluwarsa) ditangani secara otomatis
 * ============================================================
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 detik timeout
});

// ============================================================
//  REQUEST INTERCEPTOR
//  Dijalankan sebelum setiap request dikirimkan ke server.
//  Tugasnya: Mengambil token dari localStorage dan menyisipkannya
//  ke header "Authorization" secara otomatis.
// ============================================================
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ============================================================
//  RESPONSE INTERCEPTOR
//  Dijalankan setelah setiap response diterima dari server.
//  Tugasnya: Menangkap error 401 (Unauthorized) yang berarti
//  token kedaluwarsa atau tidak valid, lalu otomatis logout.
// ============================================================
apiClient.interceptors.response.use(
  (response) => {
    // Jika response sukses, langsung teruskan datanya
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token tidak valid / kedaluwarsa — bersihkan sesi dan redirect ke login
      console.warn('[API Client] Token kedaluwarsa atau tidak valid. Melakukan logout...');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect ke halaman login tanpa menyebabkan infinite loop
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
