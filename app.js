const startQuizButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const timer = document.getElementById('timer');
const timeLeft = document.getElementById('time-left');
const result = document.getElementById('result');
const highScores = document.getElementById('high-scores');
const highScoresList = document.getElementById('high-scores-list');
const initialsForm = document.getElementById('initials-form');
const initialsInput = document.getElementById('initials-input');
const submitInitialsBtn = document.getElementById('submit-initials');
const retryButton = document.getElementById('retry-btn');

const questions = [
        {
          question: "What is the output of console.log(typeof 'sometext')?",
          answers: ['number', 'string', 'boolean', 'undefined'],
          correctAnswer: 'string'
        },
        {
          question: "Which of the following is not a JavaScript data type?",
          answers: ['Boolean', 'Object', 'Character', 'String'],
          correctAnswer: 'Character'
        },
        {
          question: "How do you call a function named 'philsFunction' in Javascript?",
          answers: [
            'myFunction()',
            'def myFunction()',
            'execute myFunction()',
            'run myFunction()'
          ],
          correctAnswer: 'myFunction()'
        },
        {
          question: "Which operator is used to assign a value to a variable?",
          answers: ['-', '*', '=', '+'],
          correctAnswer: '='
        },
        {
          question: "What does 'DOM' stand for?",
          answers: [
            'Document Object Model',
            'Display Object Management',
            'Digital Operations Master',
            'Database Object Model'
          ],
          correctAnswer: 'Document Object Model'
        }
      ];
      let currentScore = 0;
      let quizTime = 60;
      let countCorrectAnswers = 0;
      let finalScore = 0;
      
      startQuizButton.addEventListener('click', startQuiz);
      
      function startQuiz() {
        startQuizButton.style.display = 'none';
        questionContainer.style.display = 'block';
        timer.style.display = 'block';
      
        timeLeft.textContent = quizTime;
        countdown = setInterval(() => {
          quizTime--;
          timeLeft.textContent = quizTime;
      
          if (quizTime <= 0) {
            clearInterval(countdown);
            endQuiz();
          }
        }, 1000);
      
        showQuestion();
      }
      
      function showQuestion() {
        const currentQuestion = questions[currentScore];
        questionContainer.innerHTML = `
          <h2>${currentQuestion.question}</h2>
          <ul>
            ${currentQuestion.answers.map((answer, i) => `<li><button onclick="submitAnswer('${answer}', event)">${answer}</button></li>`).join('')}
          </ul>
        `;
      }
      
      function submitAnswer(userAnswer, event) {
        const correctAnswer = questions[currentScore].correctAnswer;
        const targetButton = event.target;
      
        result.className = '';
      
        if (userAnswer === correctAnswer) {
          result.textContent = "Correct!";
          result.classList.add('correct');
          countCorrectAnswers++;
        } else {
          result.textContent = "Incorrect!";
          result.classList.add('incorrect');
          quizTime -= 6;
        }
      
        setTimeout(function () {
          result.textContent = "";
          result.className = '';
        }, 2000);
      
        currentScore++;
      
        if (currentScore < questions.length) {
          showQuestion();
        } else {
          endQuiz();
        }
      }
      
      function endQuiz() {
        clearInterval(countdown);
        questionContainer.style.display = 'none';
        timer.style.display = 'none';
        initialsForm.style.display = 'block';
      
        finalScore = countCorrectAnswers;
        initialsInput.value = "";
      
        retryButton.style.display = 'block';
        retryButton.onclick = function () {
          retryButton.style.display = 'none';
          resetQuiz();
          startQuiz();
        };
      }
      
      function resetQuiz() {
        currentScore = 0;
        quizTime = 60;
        countCorrectAnswers = 0;
        startQuizButton.style.display = 'block';
        questionContainer.style.display = 'none';
        timer.style.display = 'none';
        initialsForm.style.display = 'none';
        result.textContent = '';
        retryButton.style.display = 'none';
      }
      
      submitInitialsBtn.onclick = function () {
        const initials = initialsInput.value.trim();
        if (initials) {
          const highScore = { initials, score: finalScore };
          const storedHighScores = JSON.parse(localStorage.getItem('highScores')) || [];
          storedHighScores.push(highScore);
          storedHighScores.sort((a, b) => b.score - a.score);
      
          localStorage.setItem('highScores', JSON.stringify(storedHighScores));
          initialsForm.style.display = 'none';
          showHighScores();
        } else {
          alert("Please enter your initials.");
        }
      }
      
      function showHighScores() {
        document.getElementById('past-scores').style.display = 'block';
        const storedHighScores = JSON.parse(localStorage.getItem('highScores')) || [];
        var clearBtn = document.getElementById('clearbtn');
        clearBtn.onclick = function () {
          localStorage.clear();
          highScoresList.innerHTML = "";
        }
      
        highScoresList.innerHTML = storedHighScores
          .map(score => `<li>${score.initials}: ${score.score}/5</li>`)
          .join('');
      }
      
      showHighScores();
      startQuizButton.addEventListener('click', startQuiz);