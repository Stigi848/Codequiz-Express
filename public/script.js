const question = document.querySelector('#question');
const answear1 = document.querySelector('#answear1');
const answear2 = document.querySelector('#answear2');
const answear3 = document.querySelector('#answear3');
const answear4 = document.querySelector('#answear4');
const gameboard = document.querySelector('#gameboard');
const h2 = document.querySelector('h2');


function fillQuestionElements(data) {
    if (data.winner === true){
        gameboard.style.display ='none';
        h2.innerText='Wygrałeś talon na kod i balon :D '
        return;
    }
     if (data.loser === true){
        gameboard.style.display ='none';
        h2.innerText=' Oj nie udało się '
        return;
    }

    question.innerText = data.question;
    answear1.innerText = data.answers[0];
    answear2.innerText = data.answers[1];
    answear3.innerText = data.answers[2];
    answear4.innerText = data.answers[3];



}

function showNextQuestion() {
    fetch('/question', {
            method: 'GET',
        })
        .then(r => r.json())
        .then(data => {
            fillQuestionElements(data);
        })
}
showNextQuestion();

const  goodAnswerSpan = document.querySelector('#goodAnswers')

function handleAnswerFeedback(data){
    goodAnswerSpan.innerHTML=data.goodAnswers;
    showNextQuestion()
}




function sendAnswers(answersIndex) {

    fetch(`/answear/${answersIndex}`, {
            method: 'POST',
        })
        .then(r => r.json())
        .then(data => {
            handleAnswerFeedback(data);
           
        })
}

const buttons = document.querySelectorAll('.ansButton');

for (const button of buttons) {
    button.addEventListener('click', (event) => {
        const answersIndex = event.target.dataset.answer;
        sendAnswers(answersIndex);
    })
}
const tip= document.querySelector('#tip');

function handleFriendAns(data){
    tip.innerText=data.text;
}
function callToFriend() {
    // console.log('czy działa');
    fetch('/help/friend', {
            method: 'GET',
        })
        .then(r => r.json())
        .then(data => {
            handleFriendAns(data);
        })
}
document.querySelector('#callToFriend').addEventListener('click', callToFriend)


function handleHalfToHalf(data){
    if (typeof data.text === 'string'){
        tip.innerText= data.text;
    }   else{
        for (const button of buttons) {
            if (data.elementToRemove.indexOf(button.innerText) > -1){
                button.innerText ='';
            }
        }

        }
    }

function halfToHalf() {
    // console.log('czy działa');
    fetch('/help/half', {
            method: 'GET',
        })
        .then(r => r.json())
        .then(data => {
            handleHalfToHalf(data);
        })
}
document.querySelector('#halfToHalf').addEventListener('click', halfToHalf)