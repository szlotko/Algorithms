var array = generateArray(100);
//array = [0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11, 7, 15];

console.log(array.join(","));

var subsequence = findLongestSequence(array);
console.log("Longest increasing subsequence: %s", subsequence.join(","));
console.log("Length: %s", subsequence.length);

function findLongestSequence(array){

    var sequenceLength = [],
        previousElements = [];

    sequenceLength[0] = 1;

    for(var i = 1; i < array.length; i++){
        var previousElement = getPreviousElementOfSequence(array, sequenceLength, i);
        sequenceLength[i] = 1 + (previousElement != undefined
            ? sequenceLength[previousElement] : 0);
        previousElements[i] = previousElement;
    }

    var lastElementIndex = getMaxElementIndex(sequenceLength);
    var maxSequence = getSubsequence(array, previousElements, lastElementIndex);
    return maxSequence;
}

function getPreviousElementOfSequence(array, sequenceLength, i){

    var currentElement = array[i],
        maxSequence = 0,
        previousElement;

    for(var j = 0; j < i; j++){
        if(currentElement > array[j] && maxSequence < sequenceLength[j]){
            maxSequence = sequenceLength[j];
            previousElement = j;
        }
    }

    return previousElement;
}

function getSubsequence(array, previousElements, lastElement){
    var subsequence = [];
    while (lastElement != undefined) {
        subsequence.unshift(array[lastElement]);
        lastElement = previousElements[lastElement];
    }
    return subsequence;
}

function getMaxElementIndex(sequenceLength){
    var max = 0,
        maxIndex;

    sequenceLength.forEach(function(element, index){
        if(element > max){
            max = element;
            maxIndex = index;
        }
    });

    return maxIndex;
}

function generateArray(length){
    var elements = [];
    length = length || 1000;

    for(var i=0;i<length;i++){
        elements[i] = Math.floor(Math.random()*length);
    }
    return elements;
}
