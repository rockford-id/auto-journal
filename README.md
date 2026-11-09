# Mockup UI Auto Journal

Mockup layar Auto Journal (Fintegra) dengan design system portal-v3 (`summarecon/portal-ui`). Bahan diskusi tim, **bukan** aplikasi jadi: semua angka, nomor dokumen, dan akun di dalamnya adalah contoh.

## Cara membuka

Online: https://rockford-id.github.io/auto-journal/ — atau buka `index.html` (atau halaman lain di bawah) langsung di browser. Tidak perlu internet: CSS, font Inter, Bootstrap Icons, dan logo sudah ada di `assets/`.

| Halaman | Isi |
|---|---|
| `simulasi.html` | **Untuk tim:** simulasi 2 alur per tahap: A · batch 2 GR (SIPP) diposting ke GL dalam 1 no. bukti (JV-SKGM-2610-00031), B · FPP-2026-01310 + FPP-2026-01311 dicek Pajak lalu dibayar Kasbank dalam BKK-SKGM-2610-00150, dengan isi setiap tabel `aj_*` |
| `index.html` | Monitor Sinkronisasi: status per batch jurnal GL (`aj_jurnal_hdr`) N/E/Y, pesan error, jumlah gagal, isi batch |
| `detail.html` | Detail voucher GR-2610-0045: batch & no. bukti, baris subledger, baris GL batch (ringkas / detail sesuai `fg_ringkas`), rincian per PO + `jurnal_dtl_ref`, dasar pajak |
| `pajak.html` | Pemeriksaan Pajak (ilustrasi): FPP rute TAX, Pajak menambah baris TAX (PPH K + BANK D potongan) lalu `valid_transaksi = Y`; contoh tanpa PPh |
| `tagihan.html` | Tagihan Menunggu Bayar: FPP yang rinciannya belum punya `jurnal_dtl_ref`, tidak bisa dibayar sebagian, 1 BKK untuk banyak FPP |
| `parameter.html` | Master Parameter: routing per app + tipe (termasuk `fg_ringkas`), tipe jurnal, sub tipe jurnal |

Tombol tab, filter, Sebelumnya/Berikutnya, dan ikon tema (light / dark / warm) di header bisa diklik.

## Sumber & cara memperbarui

- Versi interaktif di claude.ai (canvas): https://claude.ai/artifact/2XPqHJNknJQFSYbqVmgF86 (privat, perlu dibagikan dulu oleh pemiliknya).
- `_src/canvas/*.dc.html` adalah sumber artboard canvas. Halaman HTML di folder ini dihasilkan darinya:

  ```bash
  node _src/build.mjs
  ```

- `assets/portal-ui.css` dan font disalin dari `shared-ui-package/resources/dist` (portal_v3_app). Salin ulang bila design system diperbarui.
