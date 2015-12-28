var array = generateArray(20);
console.log(array.join(","));

sort(array);
console.log(array.join(","));

function sort(array){
    quickSort(array, 0, array.length - 1);
}

function quickSort(array, start, end){

    if(end - start <= 0) return;

    var pivotIndex = randomNumberFromRange(start, end);
    if (pivotIndex != end){
        swapElements(array, pivotIndex, end);
        pivotIndex = end;
    }

    var border = start,
        pivotNumber = array[end];

    for(var index = start; index < end; index++){
        if(pivotNumber > array[index]){
            swapElements(array, border, index);
            border++;
        }
    }

    if(border != pivotIndex){
        swapElements(array, pivotIndex, border);
    }

    quickSort(array, start, border - 1);
    quickSort(array, border + 1, end);
}

function randomNumberFromRange(start, end){
    var number = Math.floor(Math.random() * (end - start + 1) + start);
    return number;
}

function swapElements(array, index1, index2){
    var buff = array[index1];
    array[index1] = array[index2];
    array[index2] = buff;
}

function generateArray(length){
    var elements = [];
    length = length || 1000;

    for(var i=0;i<length;i++){
        elements[i] = Math.floor(Math.random()*length);
    }
    return elements;
}
