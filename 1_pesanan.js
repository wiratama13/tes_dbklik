function cekValiditasPesanan(
  pesananAmbil,
  pesananMakanDiTempat,
  pesananYangDilayani
) {
  // Buat antrian untuk memproses pesanan
  let antrianAmbil = [...pesananAmbil];
  let antrianMakanDiTempat = [...pesananMakanDiTempat];

  // Proses setiap pesanan dalam daftar yang dilayani
  for (let pesanan of pesananYangDilayani) {
    if (antrianAmbil.length > 0 && pesanan === antrianAmbil[0]) {
      antrianAmbil.shift(); // Hapus pesanan yang dilayani dari antrian ambil
    } else if (
      antrianMakanDiTempat.length > 0 &&
      pesanan === antrianMakanDiTempat[0]
    ) {
      antrianMakanDiTempat.shift(); // Hapus pesanan yang dilayani dari antrian makan di tempat
    } else {
      return false; // Pesanan tidak valid jika tidak di depan salah satu antrian
    }
  }

  // Periksa apakah kedua antrian kosong
  return antrianAmbil.length === 0 && antrianMakanDiTempat.length === 0;
}

// Contoh penggunaan:
const pesananAmbil = [17, 8, 24];
const pesananMakanDiTempat = [12, 19, 2];
const pesananYangDilayani = [17, 8, 12, 19, 24, 2];

console.log(
  cekValiditasPesanan(pesananAmbil, pesananMakanDiTempat, pesananYangDilayani)
); // Output: true

// Contoh tambahan untuk menguji kasus yang tidak valid
const pesananAmbilTidakValid = [1, 3, 5];
const pesananMakanDiTempatTidakValid = [2, 4, 6];
const pesananYangDilayaniTidakValid = [1, 2, 4, 6, 5, 3];

console.log(
  cekValiditasPesanan(
    pesananAmbilTidakValid,
    pesananMakanDiTempatTidakValid,
    pesananYangDilayaniTidakValid
  )
); // Output: false
