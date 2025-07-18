const output = document.getElementById("output");
let selected = null;

const vineboom = new Audio("sfx/vine boom.mp3");
const speechon = new Audio("sfx/Speech On.wav");
const speechoff = new Audio("sfx/Speech Off.wav");

const letras = ['A', 'B', 'C', 'D'];
const perguntas = [
    ["Quanto é 2 + 2?", [
        "22",
        "420",
        "4",
        "5"
    ], 3],
    ["Quanto é 1 + 2?", [
        "12",
        "120",
        "1",
        "2"
    ], 3],
    ["Quanto é 2 + 3?", [
        "23",
        "320",
        "3",
        "4"
    ], 2]
];

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
let resposta = -1;

const correct = document.querySelector(".correct");
const correctstyle = correct.style;
const wrong = document.querySelector(".wrong");
const wrongstyle = wrong.style;

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

const perguntalength = perguntas.length;
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
    jogo.classList.remove("invisible");
    miss = 0;
    value = value % perguntalength;
    let pergunta = perguntas[value];
    let alternativas = pergunta[1];
    cabessdiv.textContent = "Questão " + (value + 1);
    perguntadiv.textContent = pergunta[0];
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
const teams = ["RED", "BLU"];
const teamdivs = [reddiv, bludiv];
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
    let score = null;
    if (right) {
        score = poscore;
        home();
        playsound(speechon);
        correct.classList.add("fadeout");
    } else {
        score = -1;
        miss++;
        playsound(speechoff)
        wrong.classList.add("fadeout");
    }
    poscore = 3;
    pontos[team] += score;
    teamdivs[team].textContent = teamdialog[team] + pontos[team];
    if (miss > 1)
        home();
    if (count == 29) {
        win((pontos[1] > pontos[0]) + 0);
    } else {
        changeteam();
    }
}

function win(value) {
    winner = value
    changeteam(winner);
    windivdiv.textContent =  teams[winner] + " ganhou!";
    windiv.classList.remove("invisible");
}

function home() {
    jogo.classList.add("invisible");
}


function removefade() {
    this.classList.remove("fadeout");
}
correct.addEventListener("animationend", removefade);
wrong.addEventListener("animationend", removefade);

passardiv.addEventListener("click", () => {
    if (teamskip[team] > 0) {
        poscore = 0;
        teamskip[team]--;
        changeteam();
    }
});

lastfade = [, []];
function fade(elem, ento, duration) {
    endfade();
    lastfade[1] = ento;
    count = 0;
    elemstyle = elem.style;
    lastfade[0] = setInterval(() => {
        count += 50;
        if (count > 50) {
            endfade();
        } else {
            elemstyle.backgroundColor = "#000000";
        }
    }, 50);
}

function endfade() {
    clearInterval(lastfade[0]);
}