// Get Buttons
const startButton1 = document.getElementById("start-button");
const highScoreButton = document.getElementById("highscore-button");

const optionButton_1 = document.getElementById("question1");
const optionButton_2 = document.getElementById("question2");
const optionButton_3 = document.getElementById("question3");
const optionButton_4 = document.getElementById("question4");

const submitInitialBtn = document.getElementById("submit-score");


const clearScoresBtn = document.getElementById("clearscores");

// Get the user initial input
var initialInput = document.getElementById("initials");

// Get display classes

var questionsEl = document.getElementById("question");

var alldoneEl = document.getElementById("all-done");
var finalScoreEl = document.getElementById("score");
var timerEl = document.getElementById("time");
var answerResponseEl = document.getElementById("answer-response");
var scoreInitialEl = document.getElementById("score-list");

// Declare and Initialize variables
var timerCount = 60;
var questionIndex = 0;
var score = 0;
var timerInterval = 0;
//display high scores on load
displayUserAndScores();

// Array of Quiz Question Object
const questionObject = [
    {
        question: "1. Inside which HTML element do we put the JavaScript?",
        option1: "1: <script>",
        option2: "2: <js>",
        option3: "3: <javascript>",
        option4: "4: <scripting>",
        answer: "1",
    }, 
    {
        question: "2. Which event occurs when the user clicks on an HTML element?",
        option1: "1: onmouseover",
        option2: "2: onchange",
        option3: "3: onmouseclick",
        option4: "4: onclick",
        answer: "4",
    }, 
    {
        question: "3. What does DOM stand for?",
        option1: "1: Data Object Muted",
        option2: "2: Data Oriented Model",
        option3: "3: Document Object Model",
        option4: "4: Domestic Object Model",
        answer: "3",
    }, 
    {
        question: "4. What HTML attribute references an external file from HTML?",
        option1: "1: src",
        option2: "2: section",
        option3: "3: h3",
        option4: "4: href",
        answer: "1",
    }, 
   
];

// start quiz
function quizStart() {
    playAgain();
    displayQuestions();
    handleInterval();
}

function displayQuestions() {
    var currQuestion = questionObject[questionIndex];

    if (questionIndex == questionObject.length) {
        return showScore();
    }
    questionsEl.textContent = currQuestion.question;
    optionButton_1.textContent = currQuestion.option1;
    optionButton_2.textContent = currQuestion.option2;
    optionButton_3.textContent = currQuestion.option3;
    optionButton_4.textContent = currQuestion.option4;
}

function handleInterval() {
    timerInterval = setInterval(function () {
        timerCount--;
        timerEl.textContent = timerCount;

        if(timerCount < 0 && questionIndex !== questionObject.length) {
            clearInterval(timerInterval);
            alert("You ran out of TIME!");
            showScore();
        }
        else if (questionIndex == questionObject.length) {
            clearInterval(timerInterval);
        }
    }, 1000);
}

function checkAnswer(userPick) {
    var correctAnswer = questionObject[questionIndex].answer;

    if (correctAnswer == userPick) {
        score++;
               answerResponseEl.textContent = "Correct"
    }
    else
    {
        timerCount = timerCount - 10;
        answerResponseEl.textContent = "Incorrect"
    }

    questionIndex++;
    displayQuestions()

    setTimeout(function() {
        answerResponseEl.textContent = "";
    }, 1000);
}

function showScore() {
    //timerCount = 0;
    alldoneEl.textContent = "All Done!";
    finalScoreEl.textContent = score;
}

function submitInitial() {
   
    var user = initialInput.value.trim();
    initialInput.value = '';
    var currentUserScores = {
        name: user.toUpperCase(),
        score: score,
    };
    var stackedUserScores = [];
    stackedUserScores = JSON.parse(localStorage.getItem("savedScores")) || [];

    if (user === "") {
        alert("Type your INITIAL correctly!");
        return;
    } else {
        stackedUserScores.push(currentUserScores);
        localStorage.setItem("savedScores", JSON.stringify(stackedUserScores));
        displayUserAndScores();
    }
}

function displayUserAndScores() {
    scoreInitialEl.textContent = "";
    var stackedUserScores = JSON.parse(localStorage.getItem("savedScores")) || [];
    var numOfUsers = stackedUserScores.length;
    var space = ": ";

    for(var i=0; i<numOfUsers; i++) {
        var nameScoreStack = document.createElement("li");

        nameScoreStack.textContent = stackedUserScores[i].name.concat(space, stackedUserScores[i].score);
        scoreInitialEl.appendChild(nameScoreStack);
    }

    var scoreArray = [];
    for(var j=0; j<numOfUsers; j++) {
        scoreArray.push(Object.values(stackedUserScores[j])[1]);
    }

    var maxScore = Math.max(...scoreArray);

    }


function playAgain() {
    timerCount = 60;
    score = 0;
    questionIndex = 0;
    alldoneEl.textContent = "";
}
    

function clearScore() {
    window.localStorage.clear();
    displayUserAndScores();
}

// addEventListeners
startButton1.addEventListener("click", quizStart);

submitInitialBtn.addEventListener("click", submitInitial);

clearScoresBtn.addEventListener("click", clearScore);
