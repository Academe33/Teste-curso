document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('quiz-form');
  const nextBtn = document.getElementById('next-btn');
  const prevBtn = document.getElementById('prev-btn');
  const submitBtn = document.getElementById('submit-btn');
  const questions = document.querySelectorAll('.question');
  const resultPopup = document.getElementById('result-popup');
  const resultContent = document.getElementById('result-content');
  const closeBtn = document.getElementById('close-btn');
  let currentQuestion = 0;

  nextBtn.addEventListener('click', () => {
    if (validateQuestion()) {
      showNextQuestion();
    }
  });

  prevBtn.addEventListener('click', showPrevQuestion);

  form.addEventListener('submit', calculateScore);

  function showNextQuestion() {
    questions[currentQuestion].classList.remove('active');
    currentQuestion++;
    questions[currentQuestion].classList.add('active');
    updateButtons();
  }

  function showPrevQuestion() {
    questions[currentQuestion].classList.remove('active');
    currentQuestion--;
    questions[currentQuestion].classList.add('active');
    updateButtons();
  }

  function updateButtons() {
    prevBtn.style.display = currentQuestion === 0 ? 'none' : 'inline-block';
    nextBtn.style.display = currentQuestion === questions.length - 1 ? 'none' : 'inline-block';
    submitBtn.style.display = currentQuestion === questions.length - 1 ? 'inline-block' : 'none';
  }

  function validateQuestion() {
    const inputs = questions[currentQuestion].querySelectorAll('input[type="radio"]');
    for (let input of inputs) {
      if (input.checked) {
        return true;
      }
    }
    alert('Por favor, selecione uma resposta antes de continuar.');
    return false;
  }

  function calculateScore(event) {
    event.preventDefault();
    let results = { 1: 0, 2: 0, 3: 0 };
    const formData = new FormData(form);
    for (let [name, value] of formData.entries()) {
      results[value]++;
    }
    showResult(results);
  }

  function showResult(results) {
    let finalResult = '';
    if (results[1] >= results[2] && results[1] >= results[3]) {
      finalResult = 'visual';
    } else if (results[2] >= results[1] && results[2] >= results[3]) {
      finalResult = 'auditivo';
    } else {
      finalResult = 'cinestésico';
    }
    resultContent.textContent = `Seu canal de aprendizagem é: ${finalResult}`;
    resultPopup.style.display = 'block';
  }

  closeBtn.addEventListener('click', closeResultPopup);

  function closeResultPopup() {
    resultPopup.style.display = 'none';
  }

  updateButtons();
});

