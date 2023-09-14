function convertNumber() {

    const NumberInput = document.getElementById("number").value;
    const fromBaseInput = parseInt(document.getElementById("fromBase").value);
    const toBaseInput = parseInt(document.getElementById("toBase").value);
    // remove spaces from start and end of input
    const numberInput = NumberInput.trim();

    let sign = '+';

    // convert the input sting into array of digits
    function convertStringToCustomBaseArray(numberInput) {
        const digitArray = [];
        let i;
        if (numberInput[0] === '-') {
            i = 1;
            sign = '-';
        } else {
            i = 0;
        }

        for (; i < numberInput.length; i++) {
            const char = numberInput[i].toLowerCase();
            let value;
            if(char===' '){
                value=undefined
            }
            if (char >= 'a' && char <= 'z') {    // convert a to z into respective numbers 10 to 35

                value = char.charCodeAt(0) - 'a'.charCodeAt(0) + 10;

            } else if (char >= '0' && char <= '9') {
                value = parseInt(char);
            }
            digitArray.push(value);
        }
        return digitArray;
    }


    // check if the input string is valid 
    function isValid(result, base) {
        for (let i = 0; i < digitArray.length; i++) {
            if (digitArray[i] === undefined || digitArray[i] > base) {
                return false;
            }
        }
        return true;
    }


    // convert  digit array into decimal number
    function decimalConvertor(digitArray, from_base) {
        let decimal = 0;
        let multipal = 1;
        for (let index = digitArray.length - 1; index >= 0; index--) {

            decimal += parseInt(digitArray[index] * multipal);
            multipal *= from_base;

        }
        return decimal
    }
    // convert decimal number into required base

    function requiredBaseConverter(decimal_number, to_base) {

        const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let ans = "";

        while (decimal_number !== 0) {
            const remainder = decimal_number % to_base;
            ans = digits[remainder] + ans;
            decimal_number = Math.floor(decimal_number / to_base);
        }

        return ans;
    }



    const digitArray = convertStringToCustomBaseArray(numberInput);

    if (!isValid(digitArray, fromBaseInput)) {
        document.getElementById("result").textContent = "Invalid input";
        return
    }

    let decimalNumber = decimalConvertor(digitArray, fromBaseInput);

    let ans = requiredBaseConverter(decimalNumber, toBaseInput);
    
    ans = sign === '-' ? sign + ans : ans;

    document.getElementById("result").textContent = ans;


}