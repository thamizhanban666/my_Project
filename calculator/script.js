let result = document.getElementById("result");
let history = document.getElementById("history");
let equal = document.getElementById("equal");
let clear = document.getElementById("clear");
let back = document.getElementById("back");
let braces = document.getElementById("braces");

let generalBtn = document.getElementsByName("generalBtn");

let resultText = "";
generalBtn.forEach((btn) => {
   btn.addEventListener("click", () => {
      let text = btn.value;
      resultText += text;
      result.value = resultText;
   })
})

equal.addEventListener("click", () => {
   let rArr = result.value.split("");
   rArr.map((e, i) => {
      if (e == "%") {
         rArr.splice(i,1,"*0.01")
      }
   })
   history.innerText = result.value;
   result.value = eval(rArr.join(""));
   resultText = eval(result.value);

})

clear.addEventListener("click", () => {
   history.innerText = "";
   result.value = "";
   resultText = "";
})

back.addEventListener("click", () => {
   let change = result.value.slice(0, result.value.length - 1);
   resultText = change;
   result.value = change;
})
braces.addEventListener("click", () => {
   function openClose() {
      let b = 0;
      for (let i = 0; i < resultText.length; i++){
         if (resultText[i] == "(") {
            b += 1;
         }
         if (resultText[i] == ")") {
            b -= 1;
         }
      }   
      if (resultText.length == 0) {
         return "(";
      }
      let l = resultText[resultText.length - 1];
      if (l == "(") {
         return "(";
      }
      if (b == 0 && l == ")" ) {
         return "*(";
      }
      if (b == 0 && l == "+" || b == 0 && l == "*" || b == 0 && l == "/" || b == 0 && l == "-" || b == 0 && l == "%") {
         return "(";
      }
      if (b == 0) {
         return "*(";
      }
      if(b>=1) {
         return ")";
      }
   }
   resultText = resultText + openClose();
   result.value = resultText;   
})

keyPress = () => {
   if (event.charCode >= 48 && event.charCode <= 57 || event.key === "." || event.key === "+" || event.key === "-" || event.key === "/" || event.key === "*") {
      result.value += key;
   }
   else if (event.key === "Enter") {
      equal.click();
   }
   else {
      alert("Only numbers are allowed");
      event.preventDefault();
   }
}
