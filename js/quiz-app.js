let choosenLang,
choosenAnswer,
correctAnswer,
id,
countOfCorrect = 0,
counter = 0,
index = 0,
randomIndex = [],
qutstionArea = document.querySelector(".question"),
answerArea = document.querySelector(".answers"),
timerContainer = document.querySelector(".timer"),
timer = document.querySelector(".timer span");
timer.style.width = "0%";



document.querySelectorAll(".categories span").forEach( span => {

    span.addEventListener("click", () => {

        choosenLang = span.dataset.category;

        document.querySelector(".popup").style.display = "none";
        document.querySelector(".layout").style.display = "none";

        getJSONFile();

    })
})

document.addEventListener("click", e => {

    if (e.target.className === "answer") {
        
        clearInterval(id);
        
        timer.style.width = "0%";

        getJSONFile();

        choosenAnswer = e.target.innerText;

        checkTheAnswer();

        if (counter === 11) endGame();

    }
})

document.querySelector(".date").innerHTML = new Date().getFullYear()

// All Functions

function getJSONFile() {
    qutstionArea.innerHTML = "";
            
                answerArea.innerHTML = "";
    if (counter !== 10) {

    handelTimer();

    counter++;

    do {
        let random = Math.floor( Math.random() * 25);
        
        if (randomIndex.indexOf(random) === -1) {
            randomIndex.push(random);
            break;
        }
    } while (randomIndex.length < 10);

    fetch(`./Quiz-JSON/${choosenLang}.json`)
        .then(response => response.json())
        .then(quiz => {

            correctAnswer = quiz[randomIndex[randomIndex.length - 1]]["correct-answer"];

            let h1 = document.createElement("h1");
            h1.append(document.createTextNode(quiz[randomIndex[randomIndex.length - 1]].title))

            qutstionArea.append(h1);

            let randomI = [];
            for (let i = 1; i <= 4; i++) {
                
                do {
                    let r = Math.ceil( Math.random() * 4);
                    
                    if (randomI.indexOf(r) === -1) {
                        randomI.push(r);
                        break;
                    }
                } while (randomI.length < 4);

                let span = document.createElement("span");
                
                span.appendChild(document.createTextNode(quiz[randomIndex[randomIndex.length - 1]][`answer-${randomI[randomI.length - 1]}`]));
                
                span.className = "answer";

                answerArea.append(span);
            }

        })
        .catch(error => {
            console.error('Error loading quiz data:', error);
        });
        
} else {
    counter++;
}
   
}

function checkTheAnswer() {

    let span = document.querySelectorAll(".progress > span")[index];

        if (choosenAnswer === correctAnswer) {
            
            span.style.backgroundColor = "#009688";
            span.style.borderColor = "#009688";
            countOfCorrect++;

        } else {

            span.style.backgroundColor = "#f44336";
            span.style.borderColor = "#f44336";

        }
        index++;
        document.querySelector(".counter span").innerHTML = index;
}

function endGame() {

    if (countOfCorrect > 5) {

        let h1 = document.createElement("h1");
        h1.append(document.createTextNode(`Congrats, You Get ${countOfCorrect} Out Of 10`));
        h1.style.color = "#009688";

        qutstionArea.append(h1);

    } else if (countOfCorrect === 5) {

       let h1 = document.createElement("h1");
        h1.append(document.createTextNode(`You Barely Made It, You Get ${countOfCorrect} Out Of 10`));
        h1.style.color = "#009688";

        qutstionArea.append(h1);

    } else {

        let h1 = document.createElement("h1");
        h1.append(document.createTextNode(`You Should Study More, You Get ${countOfCorrect} Out Of 10`));
        h1.style.color = "#009688";
        
        qutstionArea.append(h1);
    }
}

function handelTimer() {
    
    id = setInterval(() => {
        timer.style.width = `${parseFloat(timer.style.width) + 100 / 20}%`;

        if (parseInt(timer.style.width) === 100) {
            clearInterval(id);

            setTimeout(() => {
                
                getJSONFile();

                checkTheAnswer();

                timer.style.width = "0%";

                if (counter === 11) endGame();
            }, 500);
    }

}, 1000);
}