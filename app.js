const container = document.querySelector('.container');
const question = document.querySelector('#question');
const questionNum = document.querySelector('#questionNum');
let timer = document.querySelector('#time');
let img = document.querySelector('.img');
let startQuiz = document.querySelector('#start');
let retakeQuiz = document.querySelector('#restart');
let luck = document.querySelector("#luckMsg");

// const start = document.querySelector('#start');
let promptFeedback = document.querySelector('.promptFeedback');
let score = 0;
let counter = 0;
let time = 0;

let questionList;
 async function init() {
    const res = await fetch('data.json');
    let result = await res.json();
    questionList =  result.map(item=>{
        return item;
    });
        start();
}

setTimeout(() => {
    console.log(questionList);  
}, 1000)

 
startQuiz.addEventListener('click' , (e)=>{
    if(confirm('Are you sure to Kick-Start?')){
        e.preventDefault();
        setInterval( timing, 1000);
        container.classList.remove('hide');
        startQuiz.classList.add('hide');
        luck.classList.remove('hide');
        console.log(questionList);
    }
});

retakeQuiz.addEventListener('click', (e)=>{
 document.location.reload();
});

function start(){
    // container.classList.remove('hide');
    container.innerHTML =`
     <h2>Question <span id="questionNum">${counter + 1}</span></h2>
    <p id='question'>${questionList[counter].question}</p>
    <div class="note">Click answer to go to next Question</div>
    <div class="option">
        <ul data-answer='${questionList[counter].answer}'>
            <li id="A"><span>A. </span><a href="#" data-option='A'>${questionList[counter].options[0]}</a></li>
            <li id="B"><span>B. </span><a href="#" data-option='B'>${questionList[counter].options[1]}</a></li>
            <li id="C"><span>C. </span><a href="#" data-option='C'>${questionList[counter].options[2]}</a></li>
            <li id="D"><span>D. </span><a href="#" data-option='D'>${questionList[counter].options[3]}</a></li>
        </ul>
    </div> 
    `;
    
}

let resultChecker = container.addEventListener('click', result);

function result(e){
    e.preventDefault();
    // console.log(e.target);
        
        if(e.target.dataset.option){
            counter++;
            promptFeedback.classList.remove('successPrompt','failPrompt');
            // console.log(questionList[counter - 1].option)
            if(e.target.dataset.option === e.target.parentElement.parentElement.dataset.answer){
                score++;
                promptFeedback.classList.add('successPrompt');
                promptFeedback.classList.remove('opacityON');
                setTimeout(()=>{
                    promptFeedback.classList.add('opacityON');
                }, 2000)
                promptFeedback.innerHTML = `
                <p> Last Selected answer <strong>"${e.target.textContent}"</strong> is correct</p>
                `;
                // setTimeout(()=>{
                //     promptFeedback.classList.remove('successPrompt');
                // },3000);

                console.log(`score is ${score}`);
                console.log('correct');
                console.log(e.target.textContent)
     
            }else{
                console.log('Incorrect');
                console.log(`score is ${score}`);
                promptFeedback.classList.add('failPrompt');
                promptFeedback.classList.remove('opacityON');
                setTimeout(()=>{
                    promptFeedback.classList.add('opacityON');
                }, 2000)

                promptFeedback.innerHTML = `
                <p>Last Selected answer <strong>"${e.target.textContent}"</strong> is Incorrect</p>
                `;
                // setTimeout(()=>{
                //     promptFeedback.classList.remove('failPrompt');
                // },3000);
                // promptFeedback.classList.add('opacityOFF');
            }

            console.log( questionList.length);
            // container.classList.add('hide');
            counter === questionList.length? container.classList.remove('show'): container.classList.add('show');
            if(counter === questionList.length){
                
                let wait = `<center><img src="./im/gif-transparent-spinner-5.gif" width="150px" alt=""><br>
                <h3>...Result Loading</h3></center>`;
                container.innerHTML = wait;
                luck.classList.add('hide');
                setTimeout(()=>{
                    promptFeedback.classList.remove('successPrompt','failPrompt');
                },2000)
                setTimeout(()=>{
                    retakeQuiz.classList.remove('hide');
                    container.innerHTML = '';
                    container.innerHTML =`
                <center><h1>Result: <b> ${score}</b></h1> </center><br>
                <hr><br>
                <center><h1>Total Question: <b> ${counter}</b></h1> </center>
                
                `;
                }, 6500)
                
                console.log(`inside score is ${score}`)
                container.classList.add('show');
           
            }else{
                container.innerHTML =`
                <h2>Question <span id="questionNum">${counter + 1}</span></h2>
                <p id='question'>${questionList[counter].question}</p>
                <div class="note">Click answer to go to next Question</div>
                <div class="option">
                    <ul data-answer='${questionList[counter].answer}'>
                        <li id="A"><span>A. </span><a href="#" data-option='A'>${questionList[counter].options[0]}</a></li>
                        <li id="B"><span>B. </span><a href="#" data-option='B'>${questionList[counter].options[1]}</a></li>
                        <li id="C"><span>C. </span><a href="#" data-option='C'>${questionList[counter].options[2]}</a></li>
                        <li id="D"><span>D. </span><a href="#" data-option='D'>${questionList[counter].options[3]}</a></li>
                    </ul>
                </div> 

            `;

            container.classList.add('hide');
            // counter++;
            console.log(`Counter is ${counter} `);
            }
            console.log(counter);
        }

}

function timing(){
    if(counter !== questionList.length ){
        time++;
        // console.log(`time is ${time}`);
        timer.innerHTML = time;  
    }
}


document.addEventListener('DOMContentLoaded', (e)=>{
    init();
    e.preventDefault();
    retakeQuiz.classList.add('hide');
    luck.classList.add('hide');
    // setTimeout(()=>{
    //     start();
    // },200)
  
})