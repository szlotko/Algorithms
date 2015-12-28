var array = generateArray(30);

console.log(array.join(","));

sort(array);
console.log(array.join(","));

function sort(array){

    heapify(array);

    var end = array.length - 1;
    while(end > 0){

        swapElements(array, 0, end);
        end--;

        siftDown(array, 0, end);
    }

    return array;
}

function heapify(array){

    var lastIndex = array.length - 1;
    var root = parentIndex(lastIndex);

    while(root >= 0){
        siftDown(array, root, lastIndex);
        root--;
    }
}

function siftDown(array, start, end){

    var root = start,
        leftIndex = leftChildIndex(root),
        rightIndex = rightChildIndex(root);

    while(leftIndex <= end || rightIndex <= end){

        var maxChildIndex = leftIndex;

        if(rightIndex <= end && array[rightIndex] > array[leftIndex]){
            maxChildIndex = rightIndex;
        }

        if(array[root] >= array[maxChildIndex]) return;

        swapElements(array, maxChildIndex, root);
        root = maxChildIndex;

        leftIndex = leftChildIndex(root);
        rightIndex = rightChildIndex(root);
    }
}

function swapElements(array, index1, index2){
    var buff = array[index1];
    array[index1] = array[index2];
    array[index2] = buff;
}

function leftChildIndex(parent, maxElement){
    var child = 2 * (parent + 1) - 1;
    return child;
}

function rightChildIndex(parent, maxElement){
    var child = 2 * (parent + 1);
    return child;
}

function parentIndex(index){
    return Math.floor((index + 1) / 2) - 1;
}

function generateArray(length){
    var elements = [];
    length = length || 1000;

    for(var i=0;i<length;i++){
        elements[i] = Math.floor(Math.random()*length);
    }
    return elements;
}
