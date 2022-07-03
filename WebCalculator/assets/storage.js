/* Data yang disimpan dalam localStorage berupa array yang berisi beberapa objek hasil kalkulasi 
    kemudian sebelum disimpan data akan diubah menjadi string*/

const CACHE_KEY = "calculation_history"; // key untuk mengakses dan mengimpan data 

function checkForStorage(){
    return typeof(Storage) !== "undefined";
}

function putHistory(data){
    if(checkForStorage()){
        let historyData = null;
        if(localStorage.getItem(CACHE_KEY) === null){
            historyData = [];
        }
        else{
            // mengubah nilai objek dalam bentuk string ke dalam objek JavaScript
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }

        // menambahkan nilai baru pada array yang ditempatkan di awal index
        historyData.unshift(data);

        // ketika panjang history data lebih dari 5, maka nilai dengan index terakhir akan dihapus dari storage
        // sehingga riwayat kalkulasi yang ditampilkan hanya sebanyak 5 data hasil kalkulasi terakhir saja
        if(historyData.length > 5){
            historyData.pop();
        }
        // mengubah nilai objek JavaScript ke dalam bentuk String
        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
        
    }
}

function showHistory(){
    if(checkForStorage()){
        return JSON.parse(localStorage.getItem(CACHE_KEY));
    }else{
        return [];
    }
}

function renderHistory(){
    const historyData = showHistory();
    let historyList = document.querySelector('#historyList');

    // selalu hapus konten HTML pada elemen historyList agar tidak menampilkan data ganda
    historyList.innerHTML = "";

    for(let history of historyData){
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";

        historyList.appendChild(row);
    }
}

renderHistory();
