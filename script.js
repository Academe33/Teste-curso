document.addEventListener('DOMContentLoaded', function() {
  const questions = document.querySelectorAll('.question');
  const nextButton = document.getElementById('next-btn');
  const prevButton = document.getElementById('prev-btn');
  const submitButton = document.getElementById('submit-btn');
  const resultDiv = document.getElementById('result');
  const resultText = document.getElementById('result-text');
  let currentQuestionIndex = 0;

  function showQuestion(index) {
    questions.forEach((question, idx) => {
      if (idx === index) {
        question.classList.add('active');
      } else {
        question.classList.remove('active');
      }
    });
    updateButtons();
  }

  function calculateResult() {
    const answers = {
      q1: getRadioValue('q1'),
      q2: getRadioValue('q2'),
      q3: getRadioValue('q3'),
      q4: getRadioValue('q4'),
      q5: getRadioValue('q5'),
      q6: getRadioValue('q6'),
      q7: getRadioValue('q7'),
      q8: getRadioValue('q8'),
      q9: getRadioValue('q9'),
      q10: getRadioValue('q10')
    };

    let result = '';

    let score1 = parseInt(answers.q1);
    let score2 = parseInt(answers.q2);
    let score3 = parseInt(answers.q3);
    let score4 = parseInt(answers.q4);
    let score5 = parseInt(answers.q5);
    let score6 = parseInt(answers.q6);
    let score7 = parseInt(answers.q7);
    let score8 = parseInt(answers.q8);
    let score9 = parseInt(answers.q9);
    let score10 = parseInt(answers.q10);

    let totalScore = score1 + score2 + score3 + score4 + score5 + score6 + score7 + score8 + score9 + score10;

    if (totalScore >= 10 && totalScore <= 17) {
      result = "Visual";
    } else if (totalScore >= 18 && totalScore <= 25) {
      result = "Auditivo";
    } else if (totalScore >= 26 && totalScore <= 30) {
      result = "Cinestésico";
    } else {
      result = "Indefinido";
    }

    return result;
  }

  function getRadioValue(name) {
    const selectedOption = document.querySelector(`input[name="${name}"]:checked`);
    return selectedOption ? selectedOption.value : '0';
  }

  function showResult() {
    const result = calculateResult();
    resultText.textContent = `Seu canal de aprendizado é: ${result}`;
    resultDiv.style.display = 'block';
    questions.forEach(question => {
      question.style.display = 'none';
    });
    nextButton.style.display = 'none';
    prevButton.style.display = 'none';
    submitButton.style.display = 'none';
  }

  function updateButtons() {
    prevButton.style.display = currentQuestionIndex === 0 ? 'none' : 'inline-block';
    nextButton.style.display = currentQuestionIndex < questions.length - 1 ? 'inline-block' : 'none';
    submitButton.style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';
  }

  nextButton.addEventListener('click', function() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion(currentQuestionIndex);
    }
  });

  prevButton.addEventListener('click', function() {
    currentQuestionIndex--;
    if (currentQuestionIndex >= 0) {
      showQuestion(currentQuestionIndex);
    }
  });

  document.getElementById('quiz-form').addEventListener('submit', function(event) {
    event.preventDefault();
    showResult();
  });

  showQuestion(currentQuestionIndex);
});
