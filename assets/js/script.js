$(document).ready(function () {
// ===================================================
// VARIABLES
// ===================================================

// array of questions for quiz
var questions = [
    {
        q: "How many Stanley Cups have the NJ Devils won?",
        a: "Four",
        b: "One",
        c: "None",
        d: "Three",
        correctAnswer: "d"
    },
    {
        q: "What rule was invented just because of NJ Devil goalie, Martin Brodeur?",
        a: "Trapezoid Rule",
        b: "Icing Rule",
        c: "Goalie Interference Rule",
        d: "Offsides Rule",
        correctAnswer: "a"
    },
    {
        q: "Who is the youngest person to ever be added to the NJ Devils team?",
        a: "Jesper Bratt",
        b: "Nico Hischer",
        c: "Elias Pettersson",
        d: "Ty Smith",
        correctAnswer: "b"
    },
    {
        q: "When were the NJ Devils added as an official team of the NHL?",
        a: "1917",
        b: "1982",
        c: "1968",
        d: "1995",
        correctAnswer: "b"
    },
    {
        q: "Who is the leading point-getter in NJ Devils history?",
        a: "Taylor Hall",
        b: "Wayne Gretzky",
        c: "Patrik Elias",
        d: "John Maclean",
        correctAnswer: "c"
    },
];

// variables from index.html
var timer = document.querySelector("#timer");
var jumbo = document.querySelector("#jumbotron");
var startBtn = document.querySelector("#start-btn");

//variables from quiz box
var quizBox = document.getElementById("quiz-box");
var displayQuest = document.getElementById("display-questions");
var choiceA = document.getElementById("a");
var choiceB = document.getElementById("b");
var choiceC = document.getElementById("c");
var choiceD = document.getElementById("d");
var nextBtn = document.getElementById("next");
var submitQuizBtn = document.getElementById("submit-quiz");

// variables from initials box
var initialsBox = document.getElementById("initials-box");
var initialSubmitBtn = document.getElementById("submit-initials");

//variables from hs page
var goBackBtn = document.getElementById("go-back");

//JS created variables
// this variable sets the timer
var secondsLeft = 50;
//current question that will display
var currentQuestion = 0;
//keep track of score
var score = 0;
//count number of answers inputed
var counter = 0;
//used to track users answers
var userAnswer;
//used to keep track of questions 
var index = 0;

var timerInterval;


// ===================================================
// FUNCTIONS
// ===================================================

function startQuiz() {
    // decrease the seconds while displaying to user how many seconds are left
    timerInterval = setInterval(function () {
        secondsLeft--;
        timer.textContent = secondsLeft + " seconds left"

        // once timer gets to zero the timer is cleared & a message will be displayed
        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            sendMessage();
            showInitialBox();
        };
    }, 1000);
}

// message displayed once timer ends
function sendMessage() {
    timer.textContent = "Your time is up!";
};

//this function will display quiz box
function showQuizBox() {
    if (jumbo.style.display === "block" && quizBox.style.display === "none") {
        jumbo.style.display = "none";
        quizBox.style.display = "block";
    };
    displayQuestions();
};

function displayQuestions() {
    displayQuest.textContent = questions[index].q;
    choiceA.textContent = questions[index].a;
    choiceB.textContent = questions[index].b;
    choiceC.textContent = questions[index].c;
    choiceD.textContent = questions[index].d;
};

function nextQuestion() {
    checkAnswer();
    index++;
    if (index === questions.length - 1) {
        nextBtn.style.display = "none";
        submitQuizBtn.style.display = "block";
    }
    displayQuestions();
}

//will use this function to check user answer to actual answer
function checkAnswer() {
    console.log("User Answer: " + userAnswer);
    console.log("Correct Answer: " + questions[index].correctAnswer);

    if (userAnswer === questions[index].correctAnswer) {
        counter++;
        score += 100;
    } else {
        secondsLeft -= 10;
    }
    console.log("Counter: " + counter);
    console.log("Score: " + score);

    // we need score to display on yourScore which is the id on initial section
    yourScore = score;

    userAnswer = null;
}

//this function will display initial box
function showInitialBox() {
    clearInterval(timerInterval);
    sendMessage();
    checkAnswer();

    if (jumbo.style.display === "none" && quizBox.style.display === "block" && initialsBox.style.display === "none") {
        jumbo.style.display = "none";
        quizBox.style.display = "none";
        initialsBox.style.display = "block"
    }
    $("#your-score").text("Your Score: " + yourScore);
}

// this function saves data to local storage
function saveData() {
    window.location.assign("./highscores.html");
    //SAVING SCORE//
    var savedScores = JSON.parse(localStorage.getItem("highScores")) || [];
    var enteredInitials = $("#myInput").val();
    savedScores.push([enteredInitials, yourScore]);
    localStorage.setItem("highScores", JSON.stringify(savedScores));

}

// this function displays the highscores from local storage onto the dynamically created highscore table
function displayHighScores() {
    savedScores = JSON.parse(localStorage.getItem("highScores"));
    savedScores.sort(function (a, b) {return b[1] - a[1]});
    console.log(savedScores);
    for (var i = 0; i < savedScores.length; i++) {
        console.log(savedScores[i]);
        var tableRow = $("<tr>").addClass("row" + i);
        var userInitials = $("<td>").addClass("user-initials").text(savedScores[i][0]);
        var userScore = $("<td>").addClass("user-scores").text(savedScores[i][1]);

        tableRow.append(userInitials, userScore);
        $("#hsData").append(tableRow);
    }
}

// =================================================== 
// EVENT LISTENERS
// ====================================================

// this if statement makes sure that these event listeners are only being looked for on the index.html
if (startBtn) {
    //timer will start & quiz will display when press start button
    startBtn.addEventListener("click", startQuiz);
    //quiz box will display when clicked the showquizbox
    startBtn.addEventListener("click", showQuizBox);

    //when press submit quiz button it will display initial box
    submitQuizBtn.addEventListener("click", showInitialBox)

    //during the quiz, when next button is clicked it will go to next question
    nextBtn.addEventListener("click", nextQuestion);

    //when user presses button to submit initials it will run savedata function
    initialSubmitBtn.addEventListener("click", saveData);

    //listens for multiple choice options
    choiceA.addEventListener("click", function () {
        userAnswer = "a";
    })
    choiceB.addEventListener("click", function () {
        userAnswer = "b";
    })
    choiceC.addEventListener("click", function () {
        userAnswer = "c";
    })
    choiceD.addEventListener("click", function () {
        userAnswer = "d";
    })
};

//used to get highscores page to see js page
if (goBackBtn) {
    displayHighScores();
}

// ===================================================
});