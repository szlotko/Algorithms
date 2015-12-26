var length = 1000,
    elements = [];

for(var i=0;i<length;i++){
        elements[i] = Math.floor(Math.random()*length);
}

console.log("["+elements.join(",")+"]");

var hasChanges = true,
    border = length;
while(hasChanges){

    hasChanges = false;

    for(var i=0; i<border-1; i++){
        if(elements[i]>elements[i+1]){
            var buff = elements[i+1];
            elements[i+1] = elements[i]
            elements[i] = buff;

            hasChanges=true;
        }
    }

    border--;
}
console.log("["+elements.join(",")+"]");
