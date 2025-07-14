const output = document.getElementById("output");
let selected = null;

let arraymassa = [
    ["pergunta legal1", [
        "opcao1",
        "opcao2",
        "opcao3"
    ], "resposta"],
    ["pergunta legal2", [
        "opcao1",
        "opcao2",
        "opcao3"
    ], "resposta"],
    ["pergunta legal3", [
        "opcao1",
        "opcao2",
        "opcao3"
    ], "resposta"]
]

const outraarraymassa = ['A', 'B', 'C', 'D']

const opcoes = document.querySelectorAll(".opcoes div")

for (let i = 0; i < opcoes.length; i++) {
    opcoes[i].addEventListener("click", () => {
        output.textContent = "alternativa: " + outraarraymassa[i]
    })
}