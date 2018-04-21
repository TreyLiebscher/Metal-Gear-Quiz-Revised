'use strict';

const quizQuestions = [{
    number: 1,
    question: 'Hideo Kojima developed the first Metal Gear game in',
    answers: [
      '1998',
      '1987',
      '2001',
      '2005'
    ],
    right: '1987',
  },
  {
    number: 2,
    question: 'What item has consistently appeared in the games as a means of stealth?',
    answers: [
      'Active Camouflage (invisibility)',
      'A pill that makes you smaller',
      'A cardboard box',
      'The ability to hang from ceiling rafters'
    ],
    right: 'A cardboard box'
  },
  {
    number: 3,
    question: 'Name the members of Liquid Snake’s unit in Metal Gear Solid',
    answers: [
      'Revolver Ocelot - Gray Wolf - Fatman - The End - Solidus Snake',
      'Vamp - Fortune - Fatman - Solidus Snake',
      'Sniper Wolf - Raiden - Psycho Mantis - Skullface - Gray Wolf',
      'Revolver Ocelot - Psycho Mantis - Vulcan Raven - Sniper Wolf - Decoy Octopus'
    ],
    right: 'Revolver Ocelot - Psycho Mantis - Vulcan Raven - Sniper Wolf - Decoy Octopus'
  },
  {
    number: 4,
    question: 'Metal Gear Ray was first introduced in Metal Gear Solid 2: Sons of Liberty. What made it different from other Metal Gear varieties?',
    answers: [
      'Ability to travel underwater',
      'Could transport other Metal Gears',
      'Ability to travel in vacuum',
      'A big railgun'
    ],
    right: 'Ability to travel underwater'
  },
  {
    number: 5,
    question: 'Name a common strategy used to defeat the sniper, The End, in Metal Gear Solid 3: Snake Eater',
    answers: [
      'Wait until midnight when he is weaker',
      'Wait for him to die of old age',
      'Run away from him',
      'Trick him into eating a poisoned ration'
    ],
    right: 'Wait for him to die of old age'
  },
  {
    number: 6,
    question: 'Gray Wolf, the cyborg ninja, seemingly returns to life in Metal Gear Solid 2: Sons of Liberty. Who is actually wearing the suit?',
    answers: [
      'Gray Wolf (he’s not actually dead)',
      'Olga Gurlukovich',
      'Big Boss',
      'Liquid Snake'
    ],
    right: 'Olga Gurlukovich'
  },
  {
    number: 7,
    question: 'Name the three “perfect” soldiers created as a result of Les Enfants Terribles project',
    answers: [
      'Solid Snake - Liquid Snake - Raiden',
      'Revolver Ocelot - Vamp - Solid Snake',
      'Solidus Snake - Solid Snake - Liquid Snake',
      'Liquid Snake - Gaseous Snake - Solid Snake'
    ],
    right: 'Solidus Snake - Solid Snake - Liquid Snake'
  }
];

//Used to determine user's current position in the quiz
let current = 1;

function generateQuestionTemplate(currentQuest) {
  return `        
  <section id="questionForm" role="region">
    <p id="questionText">${currentQuest.question}</p>
    <form>
      <fieldset id="js-answer-choices">
        <div class="questHolder">
          <input id="ans1" class="answers" type="radio" name="answerChoice" required>
          <label for="ans1">${currentQuest.answers[0]}</label> 
        </div>
        <div class="questHolder">
          <input id="ans2" class="answers" type="radio" name="answerChoice">
          <label for="ans2">${currentQuest.answers[1]}</label> 
        </div>
        <div class="questHolder">
          <input id="ans3" class="answers" type="radio" name="answerChoice">
          <label for="ans3">${currentQuest.answers[2]}</label> 
        </div>
        <div class="questHolder">
          <input id="ans4" class="answers" type="radio" name="answerChoice">
          <label for="ans4">${currentQuest.answers[3]}</label> 
        </div>            
      </fieldset>
      <button type="submit" id="submitAnswer">CONFIRM</button>   
    </form>
  </section>
  <div id="progress">
    <span id="questionNav">${currentQuest.number} / 7</span>
    <span id="score">Current Score: ${getCurrentScore()} out of ${current - 1}</span>
    <section class="scoreKeeperBox" role="region"> 
      ${getScoreVisuals()}
    </section>
  </div>`;
}

function rightFeedback(currentQuest) {
  return `
  <section class="feedbackBox" role="region">
      <h2>Correct</h2>
      <img src='https://1.bp.blogspot.com/-Rqqj-LTH5B0/VekypBgRdlI/AAAAAAAATs4/i1726H4l7jA/s1600/big-boss-thumbs-up.gif' alt='An animated gif of Big Boss on a computer giving a thumbs up'>
    <button id="js-continue">Continue</button>
  </section>
  <div id="progress">
    <span id="questionNav">${currentQuest.number} / 7</span>
    <span id="score">Current Score: ${getCurrentScore()} out of ${current}</span>
    <section class="scoreKeeperBox" role="region"> 
      ${getScoreVisuals()}
    </section>
  </div>
  `;
}

function wrongFeedback(currentQuest) {
  return `
  <section class="feedbackBox" role="region">
    <h2>Incorrect</h2>
    <p class="feedbackDetail" name="wrongFeedbackDetail">The correct answer was</p>
    <div class="correctAnswer">${currentQuest.right}</div>
    <img src='https://media.giphy.com/media/W1gr7wLIQSecg/giphy.gif' alt='An animated gif of the game over screen from Metal Gear Solid'>
    <button id="js-continue">Continue</button>
  </section>
  <div id="progress">
    <span id="questionNav">${currentQuest.number} / 7</span>
    <span id="score">Current Score: ${getCurrentScore()} out of ${current}</span>
    <section class="scoreKeeperBox" role="region"> 
      ${getScoreVisuals()}
    </section>
  </div>
  `;
}

function resultsPage() {
  return `
  <section class="results" role="region">
    <h2>RESULTS</h2>
    <div id="resultDetails">
      <span id="scorePercentage">SCORE ${displayScorePercentage()}%</span>
      <br>
      <span id="score">${getCurrentScore()} out of ${current}</span>
    </div>
  </section>
  <section class="scoreKeeperBox" role="region"> 
    ${getScoreVisuals()}
  </section>
  <button id="js-restart" type="button">Try Again</button>
  `;
}

function startPage() {
  return `
  <h1>ARE YOU A METAL GEAR EXPERT?</h1>
  <button type="button" class="js-startQuiz" id="startQuiz">DEPLOY</button>
  `;
}

function handleStartQuiz() {
  $('.js-startQuiz').click(function (event) {
    event.preventDefault();
    nextQuestion();
  });
}

function nextQuestion() {
  let currentQuest = quizQuestions[current - 1];
  $('.js-quiz-box').html(generateQuestionTemplate(currentQuest));
}

function handleConfirm() {
  $('.js-quiz-box').on('submit', function (event) {
    event.preventDefault();
    evaluateAnswer();
    console.log('submittedAnswer');
  });
}

function right() {
  let currentQuest = quizQuestions[current - 1];
  currentQuest.correct = true;
  $('.js-quiz-box').html(rightFeedback(currentQuest));
  console.log('Correct!');
}

function wrong() {
  let currentQuest = quizQuestions[current - 1];
  currentQuest.correct = false;
  $('.js-quiz-box').html(wrongFeedback(currentQuest));
  console.log('Incorrect!');
}

function evaluateAnswer() {
  let rightAnswer = quizQuestions[current - 1].right;
  let userAnswer = $('input:checked').siblings('label').text();
  return (userAnswer == rightAnswer ? right() : wrong());
}

function getCurrentScore() {
  let scoreTotal = quizQuestions.map(function (currentQuest) {
    return currentQuest.correct;
  });
  return scoreTotal.filter(x => x).length;
}

function handleContinue() {
  $('.js-quiz-box').on('click', '#js-continue', function (event) {
    let currentQuest = quizQuestions[current - 1];
    if (current === quizQuestions.length) {
      $('.js-quiz-box').html(resultsPage());
    } else {
      moveQuest();
      nextQuestion();
    }
  });
}

function moveQuest() {
  current++;
}

function getScoreVisuals() {
  return quizQuestions.map(function (currentQuest) {
    return `
    <div class="scoreKeeper ${assignVisual(currentQuest)}" id="${currentQuest.number}">${currentQuest.number}</div>
    `;
  }).join('');
}

function assignVisual(currentQuest) {
  if (currentQuest.correct === true) {
    return 'rightAnswer';
  } else if (currentQuest.correct === false) {
    return 'wrongAnswer';
  } else {
    return '';
  }
}

function displayScorePercentage() {
  return (Math.floor((getCurrentScore() / (current)) * 100));
}

function handleTryAgain() {
  $('.js-quiz-box').on('click', '#js-restart', function (event) {
    event.preventDefault();
    current = 1;
    $('.js-quiz-box').html(startPage());
    quizQuestions.map(currentQuest => currentQuest.correct = null);
    handleStartQuiz();
  });
}

function handleMgQuiz() {
  handleStartQuiz();
  handleConfirm();
  handleContinue();
  handleTryAgain();
}

handleMgQuiz();