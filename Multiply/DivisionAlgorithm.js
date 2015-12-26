var number1 = generateNumber(),
    number2 = generateNumber();

var maxLength = Math.max(number1.length, number2.length);
var length = Math.pow(2, Math.ceil(Math.log2(maxLength)));
console.log("length:"+length);

number1 = fillWithZeros(number1, length);
number2 = fillWithZeros(number2, length);

console.log("number1:"+numberToString(number1)+"("+numberToInt(number1)+")");
console.log("number2:"+numberToString(number2)+"("+numberToInt(number2)+")");


function generateNumber(){
    var length = Math.round(Math.random() * 10)+1;
    var number = [];
    for(var i = 0; i < length; i++){
        number[i] = Math.round(Math.random() * 10) % 2;
    }
    return number;
}

function fillWithZeros(number, length){
    var zeros = length - number.length;
    if(zeros == 0) return number;

    for (var i = 0; i < zeros; i++) {
        number.unshift(0);
    }
    return number;
}

function numberToString(number){
        return number.join("");
}

function numberToInt(number){
    var numStr = numberToString(number);
    return parseInt(numStr, 2);
}
