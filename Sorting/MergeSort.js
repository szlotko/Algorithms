var array = generateArray(1000);
console.log(array.join(","));

var sortedArray = sort(array);
console.log(sortedArray.join(","));

function sort(array){

    if(array.length == 1) return array;

    var border = array.length / 2;

    var subArray1 = array.slice(0, border);
    var subArray2 = array.slice(border);

    var sortedSubArray1 = sort(subArray1);
    var sortedSubArray2 = sort(subArray2);

    var mergedSortedArray = merge(sortedSubArray1, sortedSubArray2);

    return mergedSortedArray;
}

function merge(sortedArray1, sortedArray2){
    var mergedArray = [];

    while(sortedArray1.length && sortedArray2.length){
        var nextMinValue = sortedArray1[0] < sortedArray2[0]
            ? sortedArray1.shift() : sortedArray2.shift();

        mergedArray.push(nextMinValue);
    }

    return mergedArray.concat(sortedArray1).concat(sortedArray2);
}

function generateArray(length){
    var elements = [];
    length = length || 1000;

    for(var i=0;i<length;i++){
        elements[i] = Math.floor(Math.random()*length);
    }
    return elements;
}
