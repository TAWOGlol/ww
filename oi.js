const output = document.getElementById("output");
let selected = null;

const vineboom = new Audio("sfx/vine boom.mp3");
const speechon = new Audio("sfx/Speech On.wav");
const speechoff = new Audio("sfx/Speech Off.wav");

const letras = ['A', 'B', 'C', 'D'];
let perguntas2 = [
    [
        "Qual das alternativas é uma fração imprópria?", [
            "2/578",
            "5/845",
            "30/330",
            "70/40"
        ], 3
    ], [
        "Converta o número misto 3 3/4 para uma fração imprópria:", [
            "17/4",
            "15/4",
            "18/4",
            "21/4"
        ], 1
    ], [
        "Qual a conversão correta do número misto 2 5/6 em uma fração imprópria?", [
            "17/6",
            "18/6",
            "20/6",
            "21/6"
        ], 0
    ], [
        "Converta o número misto 8 2/4 para uma fração imprópria:", [
            "34/4",
            "16/4",
            "40/4",
            "48/4"
        ], 0
    ], [
        "Qual é a fração imprópria equivalente ao número misto 5 7/5?", [
            "72/5",
            "75/5",
            "32/5",
            "35/5"
        ], 2
    ], [
        "Marque a alternativa sobre a definição de número misto:", [
            "representa um número inteiro e uma fração",
            "representa divisão entre dois números",
            "representa multiplicação entre dois números",
            "representa uma fração em que o numerador é menor que o denominador"
        ], 0
    ], [
        "Qual das seguintes alternativas é um número misto?", [
            "2/9",
            "4 1/2",
            "5.333",
            "8.25"
        ], 1
    ], [
        "O que é uma fração imprópria?", [
            "Uma fração onde o numerador é menor que o denominador.",
            "Uma fração onde o numerador é igual ou maior que o denominador.",
            "Uma fração que tem um número inteiro.",
            "Uma fração decimal."
        ], 1
    ], [
        "Qual das frações abaixo é uma fração imprópria?", [
            "3/7",
            "1/6",
            "10/10",
            "1/3"
        ], 2
    ], [
        "Qual é a fração imprópria equivalente ao número misto 4 2/3?", [
            "14/3",
            "10/3",
            "12/3",
            "17/3"
        ], 0
    ], [
        "Simplifique 15/3", [
            "45",
            "5",
            "10/2",
            "5/3"
        ], 1
    ], [
        "Qual das frações abaixo é uma fração aparente?", [
            "2/4",
            "4/3",
            "7/7",
            "16/9"
        ], 2
    ], [
        "Qual das seguintes frações é imprópria?", [
            "3/5",
            "2/3",
            "1/2",
            "8/4"
        ], 3
    ], [
        "A fração mista 3 2/5 pode ser representada pela fração imprópria:", [
            "6/5",
            "5/5",
            "7/5",
            "17/5"
        ], 3
    ], [
        "Qual a forma correta de ler a fração mista 5 1/4?", [
            "Um inteiro e cinco quartos",
            "Quatro inteiros e um quinto",
            "Cinto inteiros e um quarto",
            "Seis quartos"
        ], 2
    ], [
        "A fração 9 3/4 é classificada como:", [
            "Própria",
            "Imprópria",
            "Mista",
            "Decimal",
        ], 2
    ], [
        "Quanto é 1/2 + 2/4?", [
            "3/4",
            "3/6",
            "2/2",
            "2/6"
        ], 2
    ], [
        "A soma 3/7 + 2/7 resulta em:", [
            "5/7",
            "5/14",
            "3/9",
            "3/14"
        ], 0
    ], [
        "Qual das alternativas abaixo equivale 1/3 * 10", [
            "1/30",
            "10/3",
            "10/30",
            "1/10"
        ], 1
    ], [
        "Qual a divisão de 1/2 por 3/4", [
            "2/2",
            "4/4",
            "1/3",
            "4/6"
        ], 3
    ], [
        "Quanto vale 33/2 - 11", [
            "22/2",
            "11/2",
            "33/11",
            "11/22"
        ], 1
    ], [
        "A fração 17/13 equivale a:", [
            "221/169",
            "8/6",
            "17",
            "13"
        ], 0
    ]
];
perguntas2[30] = null;

function rng(min, max) {
    return Math.floor(min + Math.random() * (1 + max - min));
}

let perguntas = [];
function shuffle() {
    for (let i = 0; i < 31; i++) {
        randomindex = rng(0, 30 - i);
        perguntas[i] = perguntas2[randomindex];
        perguntas2.splice(randomindex, 1);
    }
}
shuffle();

const jogo = document.querySelector(".jogo");
const cabessdiv = document.querySelector(".cabess");
const perguntadiv = document.querySelector(".pergunta");
const opcoesspan = document.querySelectorAll(".opcoes span");
const opcoesdiv = document.querySelectorAll(".opcoes div");
const passardiv = document.querySelector(".passar");
const windiv = document.querySelector(".win");
const windivdiv = document.querySelector(".win div");
const playersdiv = document.querySelector(".players");
const reddiv = document.querySelector(".red");
const bludiv = document.querySelector(".blu");
const drawdiv = document.querySelector(".draw");
let resposta = -1;

const correct = document.querySelector(".correct");
const wrong = document.querySelector(".wrong");
const bum = document.querySelector(".bum");

for (let i = 0; i < opcoesdiv.length; i++) {
    opcoesdiv[i].addEventListener("click", () => {
        feedback(i == resposta, 1000);
    })
}

function diagen() {
    let array = document.querySelectorAll(".tabela div");
    let newarray = [];
    for (let i = 1; i < array.length; i++) {
        let v = array[i];
        let i2 = i - 1;
        newarray[i2] = array[i];
        v.addEventListener("click", () => {
            escolher(i2);
        })
    }
    return newarray;
}
const diasdiv = diagen();

let miss = 0;
let count = 0;
function escolher(value) {
    count++;
    diasdiv[value].classList.add("invisible");
    switch (count) {
        case 1:
            playersdiv.classList.remove("invisible");
            break;
        case 28:
            diasdiv[28].classList.remove("invisible");
            break;
        default:
            break;
    }   
    miss = 0;
    value = value % 28;
    let pergunta = perguntas[value];
    if (pergunta == null)
        return bimba();
    jogo.classList.remove("invisible");
    cabessdiv.textContent = "Questão " + (value + 1);
    perguntadiv.textContent = pergunta[0];
    let alternativas = pergunta[1];
    for (let i = 0; i < 4; i++) {
        opcoesdiv[i].textContent = letras[i] + ") " + alternativas[i];
    }
    resposta = pergunta[2];
}

function playsound(a) {
    a.currentTime = 0;
    a.play();
}

const root = document.documentElement;
const rootstyle = root.style;
const colors = [
    ["#2A1A1A", "#2D1D1D", "#312121", "#3A2525"],
    ["#1A1A2A", "#1D1D2D", "#212131", "#25253A"]
];

let team = 0;
const teams = ["RED", "BLU", "DRAW"];
const teamdivs = [reddiv, bludiv, drawdiv];
let teamskip = [1, 1];
function changeteam(value = -1) {
    root.classList.remove(teams[team])
    teamdivs[team].classList.add("deselect");
    if (value == -1)
        team = !team + 0;
    else
        team = value;
    root.classList.add(teams[team]);
    teamdivs[team].classList.remove("deselect");
    if (teamskip[team] > 0)
        passardiv.classList.remove("disablepassar")
    else
        passardiv.classList.add("disablepassar")
}
changeteam(0);

let pontos = [0, 0];
const teamdialog = ["RED: ", "BLU: "];
let poscore = 3;
let winner = null;
function feedback(right, time = 0) {
    if (right) {
        playsound(speechon);
        score(poscore);
        miss = 2;
        correct.classList.add("fadeout");
    } else {
        playsound(speechoff)
        score(-1);
        miss++;
        wrong.classList.add("fadeout");
    }
    changeteam();
    if (miss > 1)
        home();
}

function bimba() {
    playsound(vineboom);
    bum.classList.add("fadeout");
    score(-1);
    changeteam();
}

function score(value, tiimu = team) {
    poscore = 3;
    pontos[tiimu] += value;
    teamdivs[tiimu].textContent = teamdialog[tiimu] + pontos[tiimu];
}

function win(value) {
    winner = value
    changeteam(winner);
    if (winner == 2)
        windivdiv.textContent =  "Empate!";
    else
        windivdiv.textContent =  teams[winner] + " ganhou!";
    windiv.classList.remove("invisible");
}

function home() {
    jogo.classList.add("invisible");
    if (count == 29) {
        p0 = pontos[0];
        p1 = pontos[1];
        win((p1 >= p0) + (p1 == p0));
    }
}


function removefade() {
    this.classList.remove("fadeout");
}
correct.addEventListener("animationend", removefade);
wrong.addEventListener("animationend", removefade);
bum.addEventListener("animationend", removefade);

passardiv.addEventListener("click", () => {
    if (teamskip[team] > 0) {
        poscore = 0;
        teamskip[team]--;
        changeteam();
    }
});