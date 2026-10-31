# Panduan Penataan Folder Assets (Dokumen PDF & Foto)

Folder `assets/` ini dirancang khusus untuk menyimpan seluruh berkas dokumen PDF (CV, Modul Ajar, Jurnal Refleksi, Laporan Proyek) dan berkas gambar/foto (Foto Profil, Screenshot Artefak).

---

## 📁 Struktur Direktori

```text
assets/
├── docs/
│   ├── cv/
│   │   └── ringkasan-cv.pdf                  <-- File CV / Profil Ringkas PDF
│   ├── semester1/
│   │   ├── modul-ajar-diferensiasi.pdf       <-- PDF Artefak Modul Ajar Sem 1
│   │   ├── jurnal-refleksi-gibbs.pdf         <-- PDF Artefak Jurnal Refleksi Sem 1
│   │   ├── media-pembelajaran-quizizz.pdf    <-- PDF Artefak Media Pembelajaran Sem 1
│   │   └── video-praktik-ppl1.pdf            <-- PDF / Tautan Dokumentasi Video Sem 1
│   └── semester2/
│       ├── laporan-proyek-kepemimpinan.pdf   <-- PDF Laporan Proyek Kepemimpinan Sem 2
│       ├── studi-kasus-inklusif.pdf          <-- PDF Studi Kasus Pembelajaran Sem 2
│       ├── jurnal-refleksi-ppl2.pdf          <-- PDF Jurnal Refleksi Mandiri Sem 2
│       └── naskah-portofolio-akhir.pdf       <-- PDF Naskah Portofolio Akhir Sem 2
└── images/
    ├── profile/
    │   └── foto-profil.jpg                   <-- Foto Profil Utama (Siti Karunia Dewi)
    └── artifacts/
        ├── sem1-modul-ajar.jpg               <-- Gambar sampul/screenshot Modul Ajar
        ├── sem1-jurnal-refleksi.jpg          <-- Gambar sampul/screenshot Jurnal Refleksi
        ├── sem1-media-interaktif.jpg         <-- Gambar sampul/screenshot Media Digital
        ├── sem1-video-praktik.jpg            <-- Gambar thumbnail Video Praktik
        ├── sem2-proyek-kepemimpinan.jpg      <-- Gambar sampul Proyek Kepemimpinan
        ├── sem2-studi-kasus.jpg               <-- Gambar sampul Studi Kasus
        ├── sem2-jurnal-refleksi.jpg          <-- Gambar sampul Jurnal Refleksi Sem 2
        └── sem2-portofolio-akhir.jpg         <-- Gambar sampul Portofolio Akhir
```

---

## 📌 Petunjuk Penggunaan

1. **Foto Profil**:
   - Simpan foto Anda di `assets/images/profile/foto-profil.jpg`.
   - Format yang disarankan: `.jpg`, `.jpeg`, atau `.png` dengan aspek rasio 1:1 (persegi).

2. **Dokumen PDF CV**:
   - Simpan berkas CV Anda di `assets/docs/cv/ringkasan-cv.pdf`.
   - Tombol **"Unduh Ringkasan CV"** di halaman Profil akan otomatis membuka/mengunduh file ini.

3. **Dokumen PDF Artefak**:
   - Simpan file PDF masing-masing artefak di folder `assets/docs/semester1/` dan `assets/docs/semester2/` sesuai nama file di atas.
   - Tombol **"Unduh Berkas Artefak (PDF)"** pada jendela pop-up detail akan otomatis mengunduh dokumen PDF yang bersangkutan.
