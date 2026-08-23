/**
 * ============================================================
 *  MOCK BACKEND SERVER — Event Management System
 *  Jalankan dengan: node mock-backend/server.js
 *  Server berjalan di: http://localhost:5000
 * ============================================================
 */

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'event_management_secret_key_2024';
const JWT_EXPIRES_IN = '24h';

// ============================================================
//  MIDDLEWARE
// ============================================================
app.use(cors({ origin: '*' }));
app.use(express.json());

// Logger middleware - mencatat semua request yang masuk
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
  next();
});

// ============================================================
//  DATABASE IN-MEMORY (Pengganti database sesungguhnya)
// ============================================================
const db = {
  users: [
    {
      id: 'user-001',
      email: 'organizer@eventvibe.com',
      password: 'organizer123',
      name: 'Budi Santoso',
      role: 'organizer',
    },
    {
      id: 'user-002',
      email: 'organizer2@eventvibe.com',
      password: 'organizer123',
      name: 'Siti Rahayu',
      role: 'organizer',
    },
    {
      id: 'user-admin',
      email: 'admin@eventvibe.com',
      password: 'admin123',
      name: 'Admin EventVibe',
      role: 'admin',
    },
  ],
  events: [
    {
      id: 'evt-001',
      title: 'Google I/O Extended Jakarta 2025',
      description:
        'Konferensi teknologi terbesar dari Google yang dihadiri ribuan developer. Dapatkan update terbaru tentang Android, Firebase, dan AI dari para ahli Google.',
      location: 'Jakarta Convention Center, Jakarta',
      start_date: '2025-09-15T09:00:00.000Z',
      end_date: '2025-09-15T18:00:00.000Z',
      status: 'published',
      category: 'Technology',
      image_url: 'https://picsum.photos/seed/google-io/800/450',
      organizer_id: 'user-001',
      organizer_name: 'Budi Santoso',
      created_at: '2025-08-01T07:00:00.000Z',
    },
    {
      id: 'evt-002',
      title: 'React Indonesia Community Meetup',
      description:
        'Pertemuan bulanan komunitas React Indonesia. Diskusi tentang React 19, Next.js App Router, dan best practices terbaru dalam ekosistem React.',
      location: 'CoWorking Space Sudirman, Jakarta',
      start_date: '2025-09-20T13:00:00.000Z',
      end_date: '2025-09-20T17:00:00.000Z',
      status: 'published',
      category: 'Community',
      image_url: 'https://picsum.photos/seed/react-meetup/800/450',
      organizer_id: 'user-001',
      organizer_name: 'Budi Santoso',
      created_at: '2025-08-05T07:00:00.000Z',
    },
    {
      id: 'evt-003',
      title: 'Workshop UI/UX Design Thinking',
      description:
        'Workshop intensif 2 hari tentang Design Thinking untuk UI/UX. Peserta akan belajar langsung merancang produk digital berbasis empati pengguna.',
      location: 'Binus University, Jakarta',
      start_date: '2025-10-05T08:00:00.000Z',
      end_date: '2025-10-06T17:00:00.000Z',
      status: 'published',
      category: 'Design',
      image_url: 'https://picsum.photos/seed/ux-workshop/800/450',
      organizer_id: 'user-002',
      organizer_name: 'Siti Rahayu',
      created_at: '2025-08-10T07:00:00.000Z',
    },
    {
      id: 'evt-004',
      title: 'DevOps & Cloud Infrastructure Summit',
      description:
        'Summit tahunan untuk para DevOps Engineer dan Cloud Architect. Pembicara dari AWS, GCP, dan Azure berbagi pengalaman nyata di lapangan.',
      location: 'Hotel Mulia Senayan, Jakarta',
      start_date: '2025-10-12T09:00:00.000Z',
      end_date: '2025-10-12T18:00:00.000Z',
      status: 'published',
      category: 'Technology',
      image_url: 'https://picsum.photos/seed/devops-summit/800/450',
      organizer_id: 'user-002',
      organizer_name: 'Siti Rahayu',
      created_at: '2025-08-12T07:00:00.000Z',
    },
    {
      id: 'evt-005',
      title: 'Startup Pitch Night — Batch 12',
      description:
        'Malam presentasi eksklusif bagi 10 startup terpilih di hadapan investor. Hadir dan jadilah bagian dari ekosistem startup Indonesia yang berkembang.',
      location: 'GDP Labs, Jakarta',
      start_date: '2025-10-25T18:00:00.000Z',
      end_date: '2025-10-25T21:00:00.000Z',
      status: 'published',
      category: 'Business',
      image_url: 'https://picsum.photos/seed/startup-pitch/800/450',
      organizer_id: 'user-001',
      organizer_name: 'Budi Santoso',
      created_at: '2025-08-15T07:00:00.000Z',
    },
    {
      id: 'evt-006',
      title: 'Machine Learning Bootcamp — Batch 5',
      description:
        'Program bootcamp intensif 4 minggu yang membahas ML dari dasar hingga deployment model ke production. Dibimbing langsung oleh praktisi ML.',
      location: 'Online (Zoom)',
      start_date: '2025-11-01T09:00:00.000Z',
      end_date: '2025-11-29T12:00:00.000Z',
      status: 'published',
      category: 'Education',
      image_url: 'https://picsum.photos/seed/ml-bootcamp/800/450',
      organizer_id: 'user-002',
      organizer_name: 'Siti Rahayu',
      created_at: '2025-08-20T07:00:00.000Z',
    },
    {
      id: 'evt-007',
      title: '[DRAFT] Cybersecurity Workshop Lanjutan',
      description:
        'Workshop lanjutan untuk profesional keamanan siber. Masih dalam tahap persiapan, segera dipublikasikan.',
      location: 'TBA',
      start_date: '2025-12-01T09:00:00.000Z',
      end_date: '2025-12-01T17:00:00.000Z',
      status: 'draft',
      category: 'Technology',
      image_url: 'https://picsum.photos/seed/cybersec/800/450',
      organizer_id: 'user-001',
      organizer_name: 'Budi Santoso',
      created_at: '2025-08-22T07:00:00.000Z',
    },
    {
      id: 'evt-008',
      title: '[DRAFT] Product Management Masterclass',
      description:
        'Kelas eksklusif untuk Product Manager yang ingin naik level. Masih dalam tahap penyusunan kurikulum.',
      location: 'TBA',
      start_date: '2025-12-10T09:00:00.000Z',
      end_date: '2025-12-10T17:00:00.000Z',
      status: 'draft',
      category: 'Business',
      image_url: 'https://picsum.photos/seed/pm-masterclass/800/450',
      organizer_id: 'user-002',
      organizer_name: 'Siti Rahayu',
      created_at: '2025-08-22T07:00:00.000Z',
    },
  ],
};

// ============================================================
//  HELPER FUNCTIONS
// ============================================================

/**
 * Middleware: Verifikasi token JWT dari header Authorization
 * Jika token valid, informasi user dimasukkan ke req.user
 */
function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak. Token tidak ditemukan.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token tidak valid atau sudah kedaluwarsa.' });
  }
}

/**
 * Middleware: Memastikan user yang login adalah Organizer
 */
function requireOrganizer(req, res, next) {
  if (req.user.role !== 'organizer') {
    return res.status(403).json({ message: 'Forbidden. Hanya Organizer yang dapat melakukan aksi ini.' });
  }
  next();
}

/**
 * Helper: Simulasi delay server (agar skeleton loader terlihat natural di UI)
 */
function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ============================================================
//  ROUTES — AUTH
// ============================================================

/**
 * POST /auth/login
 * Body: { email, password }
 * Response: { token, user: { id, name, email, role } }
 */
app.post('/auth/login', async (req, res) => {
  await delay(500); // simulasi delay server

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email dan password wajib diisi.' });
  }

  const user = db.users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: 'Email atau password salah.' });
  }

  const payload = { id: user.id, email: user.email, name: user.name, role: user.role };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  console.log(`  ✅ Login sukses: ${user.email} (${user.role})`);
  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

/**
 * GET /auth/me
 * Header: Authorization: Bearer <token>
 * Response: { id, name, email, role }
 */
app.get('/auth/me', authenticate, async (req, res) => {
  await delay(200);
  const user = db.users.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ message: 'User tidak ditemukan.' });
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
});

// ============================================================
//  ROUTES — EVENTS
// ============================================================

/**
 * GET /events
 * Query params:
 *   - search: string (cari berdasarkan judul)
 *   - status: 'published' | 'draft' | 'all' (default: 'published' untuk publik)
 *   - page: number (default: 1)
 *   - per_page: number (default: 6)
 *   - sort: 'newest' | 'oldest' (default: 'newest')
 *   - organizer_id: string (filter event milik organizer tertentu)
 * Response: { data: [...], meta: { total, page, per_page, total_pages } }
 */
app.get('/events', async (req, res) => {
  await delay(400);

  let {
    search = '',
    status = 'published',
    page = 1,
    per_page = 6,
    sort = 'newest',
    organizer_id = '',
  } = req.query;

  page = parseInt(page);
  per_page = parseInt(per_page);

  let filtered = [...db.events];

  // Filter berdasarkan organizer_id (jika ada)
  if (organizer_id) {
    filtered = filtered.filter((e) => e.organizer_id === organizer_id);
  }

  // Filter berdasarkan status
  if (status !== 'all') {
    filtered = filtered.filter((e) => e.status === status);
  }

  // Filter berdasarkan pencarian judul (case-insensitive)
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (e) => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)
    );
  }

  // Pengurutan berdasarkan tanggal
  filtered.sort((a, b) => {
    const dateA = new Date(a.start_date);
    const dateB = new Date(b.start_date);
    return sort === 'oldest' ? dateA - dateB : dateB - dateA;
  });

  // Pagination
  const total = filtered.length;
  const total_pages = Math.ceil(total / per_page);
  const start = (page - 1) * per_page;
  const data = filtered.slice(start, start + per_page);

  res.json({
    data,
    meta: { total, page, per_page, total_pages },
  });
});

/**
 * GET /events/:id
 * Response: event object
 */
app.get('/events/:id', async (req, res) => {
  await delay(300);
  const event = db.events.find((e) => e.id === req.params.id);
  if (!event) return res.status(404).json({ message: 'Event tidak ditemukan.' });
  res.json(event);
});

/**
 * POST /events
 * Header: Authorization: Bearer <token> (Organizer only)
 * Body: { title, description, location, start_date, end_date, category, status, image_url }
 * Response: event object baru
 */
app.post('/events', authenticate, requireOrganizer, async (req, res) => {
  await delay(400);

  const { title, description, location, start_date, end_date, category, status, image_url } = req.body;

  if (!title || !location || !start_date || !end_date) {
    return res.status(400).json({ message: 'Judul, lokasi, tanggal mulai, dan tanggal selesai wajib diisi.' });
  }

  if (new Date(end_date) <= new Date(start_date)) {
    return res.status(400).json({ message: 'Tanggal selesai harus lebih besar dari tanggal mulai.' });
  }

  const organizer = db.users.find((u) => u.id === req.user.id);
  const newEvent = {
    id: `evt-${uuidv4().slice(0, 8)}`,
    title,
    description: description || '',
    location,
    start_date,
    end_date,
    status: status || 'draft',
    category: category || 'Umum',
    image_url: image_url || `https://picsum.photos/seed/${Date.now()}/800/450`,
    organizer_id: req.user.id,
    organizer_name: organizer ? organizer.name : 'Unknown',
    created_at: new Date().toISOString(),
  };

  db.events.push(newEvent);
  console.log(`  ✅ Event dibuat: "${newEvent.title}" oleh ${req.user.email}`);
  res.status(201).json(newEvent);
});

/**
 * PUT /events/:id
 * Header: Authorization: Bearer <token> (Organizer only, hanya milik sendiri)
 * Body: field yang ingin diupdate
 * Response: event object yang sudah diupdate
 */
app.put('/events/:id', authenticate, requireOrganizer, async (req, res) => {
  await delay(400);

  const idx = db.events.findIndex((e) => e.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Event tidak ditemukan.' });

  const event = db.events[idx];

  // Pastikan organizer hanya bisa update event miliknya sendiri
  if (event.organizer_id !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden. Anda hanya bisa mengedit event milik Anda sendiri.' });
  }

  // Validasi tanggal jika dikirimkan
  const start = req.body.start_date || event.start_date;
  const end = req.body.end_date || event.end_date;
  if (new Date(end) <= new Date(start)) {
    return res.status(400).json({ message: 'Tanggal selesai harus lebih besar dari tanggal mulai.' });
  }

  const updatedEvent = {
    ...event,
    ...req.body,
    id: event.id, // Pastikan ID tidak bisa diubah
    organizer_id: event.organizer_id, // Pastikan organizer tidak bisa diubah
    updated_at: new Date().toISOString(),
  };

  db.events[idx] = updatedEvent;
  console.log(`  ✅ Event diupdate: "${updatedEvent.title}" oleh ${req.user.email}`);
  res.json(updatedEvent);
});

/**
 * DELETE /events/:id
 * Header: Authorization: Bearer <token> (Organizer only, hanya milik sendiri)
 * Response: { message: 'Event berhasil dihapus.' }
 */
app.delete('/events/:id', authenticate, requireOrganizer, async (req, res) => {
  await delay(300);

  const idx = db.events.findIndex((e) => e.id === req.params.id);
  if (idx === -1) return res.status(404).json({ message: 'Event tidak ditemukan.' });

  const event = db.events[idx];

  // Pastikan organizer hanya bisa hapus event miliknya sendiri
  if (event.organizer_id !== req.user.id) {
    return res.status(403).json({ message: 'Forbidden. Anda hanya bisa menghapus event milik Anda sendiri.' });
  }

  db.events.splice(idx, 1);
  console.log(`  ✅ Event dihapus: "${event.title}" oleh ${req.user.email}`);
  res.json({ message: 'Event berhasil dihapus.' });
});

// ============================================================
//  HEALTH CHECK
// ============================================================
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: '✅ Mock Backend Event Management berjalan dengan baik!',
    endpoints: {
      auth: ['POST /auth/login', 'GET /auth/me'],
      events: [
        'GET /events?search=&page=&per_page=&status=&sort=&organizer_id=',
        'GET /events/:id',
        'POST /events (organizer)',
        'PUT /events/:id (organizer)',
        'DELETE /events/:id (organizer)',
      ],
    },
    test_accounts: {
      organizer_1: { email: 'organizer@eventvibe.com', password: 'organizer123' },
      organizer_2: { email: 'organizer2@eventvibe.com', password: 'organizer123' },
      admin: { email: 'admin@eventvibe.com', password: 'admin123' },
    },
  });
});

// ============================================================
//  START SERVER
// ============================================================
app.listen(PORT, () => {
  console.log('\n========================================');
  console.log('  🚀 Mock Backend EventVibe aktif!');
  console.log(`  📡 Server: http://localhost:${PORT}`);
  console.log('========================================');
  console.log('\n  📋 Akun Test Tersedia:');
  console.log('  👤 Organizer 1 : organizer@eventvibe.com / organizer123');
  console.log('  👤 Organizer 2 : organizer2@eventvibe.com / organizer123');
  console.log('  🔑 Admin       : admin@eventvibe.com / admin123');
  console.log('\n  📡 Endpoints tersedia:');
  console.log('  POST   /auth/login');
  console.log('  GET    /auth/me');
  console.log('  GET    /events');
  console.log('  GET    /events/:id');
  console.log('  POST   /events');
  console.log('  PUT    /events/:id');
  console.log('  DELETE /events/:id');
  console.log('\n  Menunggu request...\n');
});
