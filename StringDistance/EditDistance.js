var string1 = process.argv[2] || "sunday",
    string2 = process.argv[3] ||"saturday";

var operationTypes = {
    nothing: 0,
    insert: 1,
    delete: 2,
    substitute: 3
}

var matrix = buildMatrix(string1, string2);

showMatrix(matrix);
showDiff(matrix, string1, string2);

function buildMatrix(string1, string2){
    var matrix = [["*","*"], ["*",0]].concat(string1.split("")
        .map(function(l, i){return [l, i + 1]}));

    matrix[0] = matrix[0].concat(string2.split(""));
    matrix[1] = matrix[1].concat(string2.split("")
        .map(function(l, i){return i + 1;}));

    for(var i = 0; i <= string1.length - 1; i++){
        var letter1 = string1[i];
        for(var j = 0; j < string2.length; j++){
            var letter2 = string2[j];
            var min = minDistance(matrix, i + 2, j + 2);
            matrix[i + 2][j + 2] = min + (letter1 == letter2 ? 0 : 1);
        }
    }

    return matrix;
}

function minDistance(matrix, x, y){

    var x1 = x - 1,
        y1 = y - 1,
        pos,
        min;

    if(x1 >= 1 && (min == undefined || matrix[x1][y] < min)){
        min = matrix[x1][y];
        pos = [x1,y];
    }

    if(y1 >= 1 && (min == undefined || matrix[x][y1] < min)){
        min = matrix[x][y1];
        pos = [x,y1];
    }

    if(x1 >= 1 && y1 >= 1 && matrix[x1][y1] < min){
        min = matrix[x1][y1];
        pos = [x1,y1];
    }

    return min;
}

function buildDiffString(text, operations){
    return text.split("").map(function(l, i){
        switch (operations[i]) {
            case operationTypes.insert:
                return green(l);
            case operationTypes.delete:
                return red(l);
            case operationTypes.substitute:
                return yellow(l);
        }
        return l;
    })
    .join("");
}

function showDiff(matrix, string1, string2){
    var pos1 = matrix.length - 1,
        pos2 = matrix[0].length - 1;

    var diffStr1 = "", operations1 = [],
        diffStr2 = "", operations2 = [];

    while(pos1 > 1 || pos2 > 1){
        var min = minDistance(matrix, pos1, pos2);

        if(pos1 > 1 && pos2 > 1 && matrix[pos1 - 1][pos2 - 1] == min){
            diffStr1 = string1[pos1 - 2] + diffStr1;
            diffStr2 = string2[pos2 - 2] + diffStr2;
            operations1.unshift(matrix[pos1][pos2] == min
                ? operationTypes.nothing : operationTypes.substitute);
            operations2.unshift(matrix[pos1][pos2] == min
                ? operationTypes.nothing : operationTypes.substitute);

            pos1--;
            pos2--;
            continue;
        }

        if(pos2 > 1 && matrix[pos1][pos2 - 1] == min){

            diffStr1 = "-" + diffStr1;
            diffStr2 = string2[pos2 - 2] + diffStr2;
            operations1.unshift(operationTypes.delete);
            operations2.unshift(operationTypes.insert);
            pos2--;
            continue;
        }

        diffStr1 = string1[pos1 - 2] + diffStr1;
        diffStr2 = "-" + diffStr2;
        operations1.unshift(operationTypes.insert);
        operations2.unshift(operationTypes.delete);
        pos1--;
    }

    console.log(buildDiffString(diffStr1, operations1));
    console.log(buildDiffString(diffStr2, operations2));
}

function showMatrix(matrix){
    console.log("Matrix:");
    for(var i = 0; i < matrix.length; i++){
        console.log(matrix[i].join(" "));
    }
    console.log("\nNumber of operation: %s\n", matrix[matrix.length - 1][matrix[0].length - 1]);
}

function red(str){
    return "\u001b[31m"+ str + "\u001b[39m";
}
function green(str){
    return "\u001b[32m"+ str + "\u001b[39m";
}
function yellow(str){
    return "\u001b[33m"+ str + "\u001b[39m";
}
