function gameSrc(app){

let isGameOver = false;
let goodAnswers = 0;
let callToFriend = false;
let questionToCrowd = false;
let halfToHalf = false;
const questions =[
    {question: 'Jaki jest najlepszy język programowania?',
    answers: ['C++', 'Java', 'JS', 'Python'],
    corretAnswear: 2,},

    {question: 'Jaka jest najlepsza marka motocyklii?',
    answers: ['BMW', 'Ducati', 'Honda', 'HD'],
    corretAnswear: 1,
},
{question: 'Jaki jest najlepsza gra?',
    answers: ['DOOM', 'Mortal Kombat', 'Crash', 'NFS'],
    corretAnswear: 0,
}
];

app.get('/question', (req, res)=>{
    if(goodAnswers === questions.length){
        res.json({
            winner: true
        })
    } else if(isGameOver){
        res.json({loser: true})

    }
     else {
        const nextQuestion = questions[goodAnswers];
        const {question, answers} = nextQuestion;
        // console.log(nextQuestion);
res.json({
    question, answers,
})
     }
})
app.post('/answear/:index', (req, res)=>{
    if (isGameOver){
        res.json({
            loser: true,
        })
    }
    const {index } = req.params;
    const question = questions[goodAnswers]
 const isGoodAnswer = question.corretAnswear === Number(index);
console.log(isGoodAnswer);
 if (isGoodAnswer){
goodAnswers++;

 } else {
 isGameOver=true;
 }

    res.json({corret:isGoodAnswer,
        goodAnswers

    })
    

})

app.all('/help/friend', (req,res)=>{
    if(callToFriend){
        return res.json({
            text: 'koło było użyte'
        }) ;
    }
    callToFriend = true;

    const friendAnswear = Math.random()< 0.5;
    const question = questions[goodAnswers]
    res.json({
        text: friendAnswear ? 
        `wydaje mi się ,że poprawna odpowiedź to ${question.answers[question.corretAnswear]}`
        : 'hmm... nie wiem'
    })

})
app.all('/help/half', (req,res)=>{
    if(halfToHalf){
        return res.json({
            text: 'koło było użyte'
        }) ;
    }
    halfToHalf = true;
const question = questions[goodAnswers]
    let answCoppy = question.answers.filter((s, index)=>(
index !== question.corretAnswear
    ));
  

    answCoppy.splice(~~Math.random()* answCoppy.length , 1)
    
    res.json({
        elementToRemove: answCoppy,
    })

})
}
module.exports= gameSrc;