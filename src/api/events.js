import apiClient from './client';

/**
 * ============================================================
 *  EVENTS API FUNCTIONS
 *
 *  GET    /events              → Daftar event (search, filter, pagination)
 *  GET    /events/:id          → Detail satu event
 *  POST   /events              → Buat event baru (Organizer)
 *  PUT    /events/:id          → Update event (Organizer, milik sendiri)
 *  DELETE /events/:id          → Hapus event (Organizer, milik sendiri)
 * ============================================================
 */

/**
 * Ambil daftar event dengan query params
 * @param {Object} params
 * @param {string} [params.search]        - Kata kunci pencarian judul/deskripsi
 * @param {string} [params.status]        - 'published' | 'draft' | 'all'
 * @param {number} [params.page]          - Nomor halaman (default: 1)
 * @param {number} [params.per_page]      - Jumlah item per halaman (default: 6)
 * @param {string} [params.sort]          - 'newest' | 'oldest'
 * @param {string} [params.organizer_id]  - Filter event milik organizer tertentu
 * @returns {{ data: Event[], meta: { total, page, per_page, total_pages } }}
 */
export async function apiGetEvents(params = {}) {
  const response = await apiClient.get('/events', { params });
  return response.data;
}

/**
 * Ambil detail satu event berdasarkan ID
 * @param {string} id - ID event
 * @returns {Event}
 */
export async function apiGetEventById(id) {
  const response = await apiClient.get(`/events/${id}`);
  return response.data;
}

/**
 * Buat event baru (hanya Organizer)
 * @param {Object} eventData
 * @param {string} eventData.title
 * @param {string} eventData.description
 * @param {string} eventData.location
 * @param {string} eventData.start_date  - ISO Date string
 * @param {string} eventData.end_date    - ISO Date string
 * @param {string} [eventData.category]
 * @param {string} [eventData.status]    - 'draft' | 'published'
 * @param {string} [eventData.image_url]
 * @returns {Event}
 */
export async function apiCreateEvent(eventData) {
  const response = await apiClient.post('/events', eventData);
  return response.data;
}

/**
 * Update event yang sudah ada (hanya Organizer, hanya milik sendiri)
 * @param {string} id         - ID event yang akan diupdate
 * @param {Object} eventData  - Field-field yang ingin diperbarui
 * @returns {Event}
 */
export async function apiUpdateEvent(id, eventData) {
  const response = await apiClient.put(`/events/${id}`, eventData);
  return response.data;
}

/**
 * Hapus event (hanya Organizer, hanya milik sendiri)
 * @param {string} id - ID event yang akan dihapus
 * @returns {{ message: string }}
 */
export async function apiDeleteEvent(id) {
  const response = await apiClient.delete(`/events/${id}`);
  return response.data;
}
