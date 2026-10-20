# Mockup UI Auto Journal

Mockup layar Auto Journal (Fintegra) dengan design system portal-v3 (`summarecon/portal-ui`). Bahan diskusi tim, **bukan** aplikasi jadi: semua angka, nomor dokumen, dan akun di dalamnya adalah contoh.

## Cara membuka

Online: https://rockford-id.github.io/auto-journal/ — atau buka `index.html` (atau halaman lain di bawah) langsung di browser. Tidak perlu internet: CSS, font Inter, Bootstrap Icons, dan logo sudah ada di `assets/`.

| Halaman | Isi |
|---|---|
| `simulasi.html` | **Untuk tim:** simulasi lengkap reimbursement RB-2026-01250 per tahap (user → Pajak → Kasbank → GL) dengan isi setiap tabel `aj_*` |
| `index.html` | Monitor Sinkronisasi: jurnal rute langsung GL (`aj_jurnal_hdr`), status N/Y/E, retry |
| `detail.html` | Detail Jurnal: header, baris D/K, cek balance, kunci setelah posting, tie-out rincian per PO |
| `pajak.html` | Pemeriksaan Pajak: antrian voucher `fg_pph = Y`, penentuan PPh per detail, potongan pembayaran |
| `tagihan.html` | Tagihan Menunggu Bayar: rincian yang belum tertaut ke jurnal, status cek pajak, umur tagihan |
| `parameter.html` | Master Parameter: routing per app + tipe, tipe jurnal, sub tipe jurnal |

Tombol tab, filter, Sebelumnya/Berikutnya, dan ikon tema (light / dark / warm) di header bisa diklik.

## Sumber & cara memperbarui

- Versi interaktif di claude.ai (canvas): https://claude.ai/artifact/2XPqHJNknJQFSYbqVmgF86 (privat, perlu dibagikan dulu oleh pemiliknya).
- `_src/canvas/*.dc.html` adalah sumber artboard canvas. Halaman HTML di folder ini dihasilkan darinya:

  ```bash
  node _src/build.mjs
  ```

- `assets/portal-ui.css` dan font disalin dari `shared-ui-package/resources/dist` (portal_v3_app). Salin ulang bila design system diperbarui.
