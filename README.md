# Kid Banker — Documentation

**Versi:** 1.0.0 <br>
**Terakhir Diperbarui:** 12 April 2026

---

## Daftar Isi

1. [Pendahuluan](#1-pendahuluan)
2. [Fungsi Utama](#2-fungsi-utama)
3. [Fitur Unggulan](#3-fitur-unggulan)
4. [Arsitektur Frontend](#4-arsitektur-frontend)
5. [Autentikasi Pengguna](#5-autentikasi-pengguna)
6. [Setup & Konfigurasi](#6-setup--konfigurasi)
7. [Referensi Dependencies Utama](#7-referensi-dependencies-utama)

---

## 1. Pendahuluan

**Kid Banker** adalah platform manajemen keuangan keluarga berbasis peran yang bertujuan menanamkan literasi finansial sejak dini melalui kolaborasi antara orang tua (Parent) dan anak (Kid). Repositori ini merupakan antarmuka pengguna (Frontend) dari sistem tersebut.

Aplikasi ini dibangun menggunakan **React** dengan build tool **Vite**, dikombinasikan dengan **Tailwind CSS** untuk penataan gaya antarmuka, dan **Recharts** untuk visualisasi data keuangan. Klien ini terintegrasi langsung dengan Kid Banker API, Supabase, dan layanan autentikasi Google OAuth.

---

## 2. Fungsi Utama

| No. | Fungsi | Deskripsi |
| --- | --- | --- |
| 1 | Antarmuka Autentikasi | Alur login, registrasi, dan pemilihan peran (Role) yang terintegrasi dengan Google OAuth |
| 2 | Dashboard Orang Tua | Pemantauan saldo, persetujuan pengajuan pinjaman/paylater, dan catatan transaksi seluruh anak |
| 3 | Dashboard Anak | Tampilan tabungan pribadi, pencatatan transaksi masuk/keluar, serta formulir pengajuan paylater |
| 4 | Visualisasi Data | Menampilkan statistik pengeluaran dan pemasukan tiap minggu/bulan melalui metrik grafik |
| 5 | Manajemen Profil | Pengaturan dan pengaitan akun anak dengan kode unik (Parent Code) dari orang tua yang terhubung |

---

## 3. Fitur Unggulan

- **Single Page Application (SPA)** — Navigasi super mulus dengan load state yang ringan berkat kapabilitas React dan Vite.
- **Role-Based Routing** — Sistem perlindungan halaman yang mengunci tampilan fitur sesuai hak akses pengguna (Parent/Kid).
- **Clean & Modern UI** — Komponen antarmuka yang elegan menggunakan Tailwind CSS dan tipografi Plus Jakarta Sans.
- **Seamless Google OAuth** — Implementasi `@react-oauth/google` memberikan pengalaman masuk yang aman tanpa perlu kelola kata sandi.
- **Interactive Charts** — Visualisasi rekam jejak arus transaksi berbasis grafik dari Recharts.

---

## 4. Arsitektur Frontend

Aplikasi mengadopsi pendekatan desain arsitektur modular berbasis komponen.

```text
+--------------------------------------------+
|        Kid Banker Frontend (React)         |
+--------------------------------------------+
|  Routing (React Router DOM)                |
|  · /login, /register, /dashboard, dll.     |
+--------------------------------------------+
|  State Management & Context Auth           |
|  · Penyimpanan sesi dan role pengguna      |
+--------------------------------------------+
|  Layer Komponen UI (Tailwind CSS)          |
|  · Layout, Pages, Forms, Cards, Charts     |
+--------------------------------------------+
|  Services & Integrasi Eksternal            |
|  · Axios Client untuk Kid Banker API       |
|  · Supabase Client                         |
|  · Google Identity Services                |
+--------------------------------------------+
```

---

## 5. Autentikasi Pengguna

Konsep keamanan sisi klien (Frontend) berjalan berdasar integrasi JWT Token dan Autentikasi OAuth Google.

### Alur Otentikasi

1. Klien mengirim permintaan autentikasi ke Google melalui komponen antarmuka yang membungkus otentikator pihak ketiga.
2. Saat kredensial (seperti `id_token` dan `refresh_token`) didapatkan dari Google, detail tersebut diteruskan ke API Kid Banker melalui **Axios**.
3. Jika pengguna terdaftar, API mengembalikan data dasar profil bersama sebuah **JWT Token**. Jika belum, UI akan memandu pengguna ke bagian Registrasi dan pendaftaran Peran (Role).
4. **Token** yang valid tersebut akan disimpan (di Storage klien) untuk selanjutnya disematkan pada setiap _header request_ yang memanggil _protected endpoints_ pada API.

---

## 6. Setup & Konfigurasi

Ikuti langkah-langkah di bawah ini untuk menjalankan Kid Banker.

### 6.1 Instalasi Awal

1. Clone repositori ini:
   ```bash
   git clone https://github.com/andkstrr/KidBankerApp.git
   cd KidBankerApp
   ```
2. Install dependensi modul:
   ```bash
   npm install
   ```

### 6.2 Konfigurasi Environment (.env)

Salin file `.env.example` menjadi `.env` kemudian isi variabel sesuai milik Anda:

```bash
cp .env.example .env
```

**Variabel yang Diperlukan:**
- `VITE_API_URL`: Entry point REST API Backend, misal: `http://localhost:3000`
- `VITE_GOOGLE_CLIENT_ID`: Google OAuth Client ID
- `VITE_GOOGLE_CLIENT_SECRET`: Google OAuth Client Secret
- `VITE_GOOGLE_REDIRECT_URI`: Path callback redirect untuk OAuth
- `VITE_SUPABASE_URL`: URL Base proyek Supabase
- `VITE_SUPABASE_PUBLISHABLE_KEY`: Key Anonim/Publishable Supabase

### 6.3 Menjalankan Aplikasi Lokal

Setelah semua disiapkan, Anda dapat menyalakan server Vite di lingkungan lokal (development mode):

```bash
npm run dev
```

Secara default, platform dapat diakses di browser melalui [http://localhost:5173](http://localhost:5173).

### 6.4 Build Production

Jika ingin memproduksi _assets bundle_ agar siap dipublikasikan ke server cloud/hosting, jalankan instruksi:

```bash
npm run build
```

---

## 7. Referensi Dependencies Utama

Daftar modul penting yang menjadi pijakan proyek Frontend ini:

| Modul utama | Versi |
| --- | --- |
| **React** & **ReactDOM** | `^19.x` |
| **Vite** | `^7.x` |
| **Tailwind CSS** | `^4.x` |
| **React Router DOM** | `^7.x` |
| **Recharts** | `^3.x` |
| **Axios** | `^1.x` |
| **@react-oauth/google** | `^0.13.x` |
| **Lucide React** & **React Icons** | _Various_ |

---

_Dokumentasi dikompilasi berdasarkan source code repository Kid Banker._
_Didedikasikan untuk selaras secara fitur dan arsitektur dengan API Kid Banker._
