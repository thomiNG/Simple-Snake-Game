const arrayVar = ["hi", "hello", "hallo", "grüzie"];
const duplicateArray = arrayVar.slice();
duplicateArray.push("ciao");

console.log("Original array:")
for (let i = 0; i < arrayVar.length; i++) {

    console.log(arrayVar[i]);

}

console.log("\nDuplicate array:")
for (let i = 0; i < duplicateArray.length; i++) {

    console.log(duplicateArray[i]);

}