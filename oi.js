const output = document.getElementById("output");
let count = 0;

function showOut() {
    count ++;
    output.innerHTML = "apertou isso ai: " + count +
    "<br> e tbm tem isso: " + document.querySelector('input[name="alternativa"]:checked').value;
}