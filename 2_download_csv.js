const axios = require("axios");
const cheerio = require("cheerio");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// URL halaman Wikipedia
const url = "https://id.wikipedia.org/wiki/Daftar_kabupaten_di_Indonesia";

// Fungsi untuk mengambil dan memproses data
async function ambilData() {
  try {
    // Ambil HTML dari URL
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Temukan tabel yang berisi daftar kabupaten
    const tabel = $("table.wikitable");

    // Array untuk menyimpan data
    const kabupaten = [];
    const provinsi = [];

    // Ekstrak data dari tabel
    tabel.find("tr").each((index, row) => {
      // Lewati baris header
      if (index === 0) return;

      const kolom = $(row).find("td");
      if (kolom.length >= 2) {
        const namaKabupaten = $(kolom[0]).text().trim();
        const namaProvinsi = $(kolom[1]).text().trim();
        kabupaten.push(namaKabupaten);
        provinsi.push(namaProvinsi);
      }
    });

    // Buat instance penulis CSV
    const penulisCsv = createCsvWriter({
      path: "kabupaten_indonesia.csv",
      header: [
        { id: "kabupaten", title: "Kabupaten" },
        { id: "provinsi", title: "Provinsi" },
      ],
    });

    // Tulis data ke CSV
    const catatan = kabupaten.map((namaKabupaten, index) => ({
      kabupaten: namaKabupaten,
      provinsi: provinsi[index],
    }));

    await penulisCsv.writeRecords(catatan);
    console.log("Data berhasil disimpan ke 'kabupaten_indonesia.csv'");
  } catch (error) {
    console.error(
      "Terjadi kesalahan saat mengambil atau memproses data:",
      error
    );
  }
}

// Jalankan fungsi
ambilData();
