
const bill = document.querySelector('.inputbill')
const custom = document.querySelector('.custom')
const tipBtns = document.querySelectorAll('.btn')
const numberpeople = document.querySelector('.peopleinput')
const tiptotal = document.querySelector('.tiptotal')
const person = document.querySelector('.tipperson')
const errorMsg = document.querySelector('.error-msg')
const Totalresults = document.querySelectorAll('.tiptotal')
const Divideresults = document.querySelectorAll('.tipperson')
const btnreset = document.querySelector('.buttonreset')

bill.addEventListener('input', setBillValue);

tipBtns.forEach(btn => {
    btn.addEventListener('click', handleCLick)
})

custom.addEventListener('input', setCustomValue)

numberpeople.addEventListener('input', setPersonValue) 

btnreset.addEventListener('click', reset)

let billValue = 0.0
let tipValue = 0.15
let personvalue = 1

function validadeFloat(s){
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx)
}

function validadeInt(s){
    var rgx = /^[0-9]*$/
    return s.match(rgx)
}

function setBillValue() {
    if(bill.value.includes(',')){
        bill.value = bill.value.replace(',','.')
    }
    // Muda de , para .

    if(!validadeFloat(bill.value)){
        bill.value = bill.value.substring(0, bill.value.length-1)
    }

    // Não permite que digite caracteres indevidos


    billValue = parseFloat(bill.value);

    calculateTip()

}

function handleCLick(event){
    tipBtns.forEach(btn => {
        //Apagar estado ativo
        btn.classList.remove('buttonactive')

        // Adicionar estado ativo
        if(event.target.innerHTML == btn.innerHTML){
            btn.classList.add('buttonactive')
            tipValue = btn.value
        }
    })

    
}

//Clear custom tip
    custom.value = ''

    calculateTip()

function setCustomValue() {
    if(!validadeInt(custom.value)){
        custom.value = custom.value.substring(0, custom.value.length-1)
    } // Apenas digitar números

    tipValue = parseFloat(custom.value/100);

    // Remove status ativo dos botões 
    tipBtns.forEach(btn => {
        btn.classList.remove('buttonactive')
    })

    if(custom.value !== ''){
        calculateTip()
    }
    
}

function setPersonValue(){
    if(!validadeInt(numberpeople.value)){
        numberpeople.value = numberpeople.value.substring(0, numberpeople.value.length-1)
    }

    personvalue = parseFloat(numberpeople.value)

    if(personvalue <= 0){
        errorMsg.classList.add('show-error-msg')
        setTimeout(function(){
            errorMsg.classList.remove('show-error-msg')
        },3000);
    }

    calculateTip()
}

function calculateTip(){
    if (personvalue >= 1){
        let total = billValue * tipValue
        let divide = (billValue * tipValue) / personvalue

        console.log(total)
        console.log(divide)

        
        Totalresults[0].innerHTML = "$" + total.toFixed(2);
        Divideresults[0].innerHTML = "$" + divide.toFixed(2);
    }
}

function reset() {
    bill.value = '0'
    setBillValue()

    tipBtns[2].click()

    personvalue = '1'
    setPersonValue()
}
