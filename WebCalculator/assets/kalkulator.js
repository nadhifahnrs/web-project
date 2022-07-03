console.log("Selamat Anda berhasil menggunakan JavaScript pada Website");

// global variable
const calculator = {
    displayNumber: '0',
    operator: null,
    firstNumber: null,
    waitingForSecondNumber:false,
};

// meng-update nilai angka pada kalkulator
function updateDisplay(){
    document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}

// menghapus/membersihkan nilai angka pada kalkulator
function clearCalculator(){
    calculator.displayNumber = '0';
    calculator.operator =  null;
    calculator.firstNumber = null;
    calculator.waitingForSecondNumber = false;
}

// menambahkan nilai angka yang ditampilkan pada kalkulator
function inputDigit(digit){
    if(calculator.displayNumber === '0'){
        calculator.displayNumber = digit;
    }
    else{
        calculator.displayNumber += digit;
    }

}

// event handler ketika tombol di klik oleh user

// inisialisasi variabel button yang me-return seluruh list node dan turunan dari class button
const buttons = document.querySelectorAll('.button');
for(const button of buttons){
    button.addEventListener('click', function(event){
        // mendapatkan objek elemen yang di klik
        const target = event.target;

        // ketika elemen yang di klik memuat konten dengan nama class clear
        if(target.classList.contains('clear')){
            clearCalculator();
            updateDisplay();
            return; // memberhentikan fungsi event handler agar code di bawah tidak dieksekusi
        }

        // ketika elemen yang di klik memuat konten dengan nama class negative
        if(target.classList.contains('negative')){
            inverseNumber();
            updateDisplay();
            return;
        }

        // ketika elemen yang di klik memuat konten dengan nama class equals
        if(target.classList.contains('equals')){
            performCalculation();
            updateDisplay();
            return;
        }

        // ketika elemen yang di klik memuat konten dengan nama class operator
        if(target.classList.contains('operator')){
            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText);
        updateDisplay();
    })
}

// mengubah tanda nilai angka positif menjadi negatif
function inverseNumber(){
    if(calculator.displayNumber === '0'){
        return;
    }
    calculator.displayNumber = calculator.displayNumber * -1;
}

// menyimpan nilai angka sebelum dan operator 
function handleOperator(operator){
    if(!calculator.waitingForSecondNumber){
        calculator.operator = operator;
        calculator.waitingForSecondNumber = true;
        calculator.firstNumber = calculator.displayNumber;

        // mengatur ulang nilai display number sehingga ketika tombol angka selanjutnya ditekan akan dimulai dari angka pertama lagi
        calculator.displayNumber = '0';
    }else{
        alert('Operator sudah ditetapkan');
    }
}

// menghitung hasil perhitungan nilai angka pada kalkulator
function performCalculation(){
    if(calculator.firstNumber == null || calculator.operator == null){
        alert('Anda belum menetapkan operator');
        return;
    }

    let result = 0;
    if (calculator.operator === '+'){
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    }else{
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    }

    // parseInt = mengubah nilai string menjadi integer

    const history = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }
    putHistory(history); // menyimpan data ke dalam local storage
    calculator.displayNumber = result;
    renderHistory(); // menampilkan hasil riwayat kalkulasi
}