// console.log("jay shree ram");
let type_content = document.querySelector('.type_content p');
let input = document.getElementById('typeValue');
let resetBtn = document.querySelector('.bottom_part button');
let soundBtn = document.querySelector('.sound input');
let letterIndex = (mistakes = isTyping = 0);
let time;
let t_left = document.querySelector('.t-left');
let error = document.querySelector('.error');
let wpm = document.querySelector('.wpm');
let cpm = document.querySelector('.cpm');
let maxTime = 60;
let timeleft = maxTime;

let correctType = new Audio('type.mp3');
let IncorrectType = new Audio('wrong.mp3');


const playSound = () =>{
    correctType.pause();
    IncorrectType.pause();
}

soundBtn.addEventListener('click', ()=>{
    playSound();
})

//define the loadPera function
const loadPera = () => {
    let random_Pera = Math.floor(Math.random() * article.length);
   type_content.innerHTML = "";
    article[random_Pera].split('').forEach(element => {
        let realData = `<span>${element}</span>`;
        type_content.innerHTML += realData;
    });

   type_content.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('click', ()=>{
        input.focus();
    })
    type_content.addEventListener('click', ()=>{
        input.focus();
    })
}

loadPera();


input.addEventListener('input', (e) => {
    let char = type_content.querySelectorAll('span');
    let inputValue = e.target.value.split('')[letterIndex];

    if (!isTyping) {
        time = setInterval(timeSetup, 1000);
        isTyping = true;
    }

    if (letterIndex < char.length - 1) {
        if (inputValue == null) {
            if(letterIndex > 0){
                letterIndex--;
                if(char[letterIndex].classList.contains('incorrect')){
                    mistakes--
                }
                char[letterIndex].classList.remove('correct','incorrect');
            }
        } else {
            if (char[letterIndex].innerText == inputValue) {
                char[letterIndex].classList.add('correct');
                correctType.play();
                // playSound();
            } else {
                char[letterIndex].classList.add('incorrect');
                mistakes++;
                IncorrectType.play();
                // playSound();
            }
        }


        letterIndex++;
        char.forEach(element =>{
            element.classList.remove('active');
        })
        char[letterIndex].classList.add('active');
        error.innerText = `Mistakes : ${mistakes}`;
        cpm.innerText = `CPM : ${letterIndex - mistakes}`;
    } else {
        clearInterval(time);
        input.value = "";
    }

});

const timeSetup = () =>{
    if(timeleft > 0){
        timeleft--;
        t_left.innerText = `Time-Left : ${timeleft}S`;
        let wpmTab = Math.round((letterIndex - mistakes) / 5 / (maxTime - timeleft) * 60);
        wpm.innerText = `WPM : ${wpmTab}`;
    }else{
        clearInterval(time);
        input.value = "";
    }
};


resetBtn.addEventListener('click', ()=>{
    loadPera();
    clearInterval(time);
    wpm.innerText = `WPM : `;
    error.innerText = `Mistakes : `;
    cpm.innerText = `CPM :`;
    timeleft = maxTime;
    t_left.innerText = `Time-Left : ${maxTime}S`;
    input.value = "";
    letterIndex = mistakes = isTyping = 0;
})