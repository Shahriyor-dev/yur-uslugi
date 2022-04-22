(function () {
  // Variables
  const quizContainer = document.getElementById('quiz');
  const quizTitle = document.getElementById('title');
  const allQuestions = document.getElementById('all');
  const currentQuestion = document.getElementById('current');
  const proggressBar = document.getElementById('progress');
  const attentionText = document.getElementById('attention');
  const restartBtn = document.getElementById('reset');
  const submitButton = document.getElementById('submit');
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const quizWrapper = document.getElementById('quez-wrapper');
  const quizSuccess = document.getElementById('success');
  let emailInput = null;
  let currentSlide = 0;
  let answers = {
    answer: [],
    contact: []
  };
  myQuestions = data.myQuestions
  submitForms = data.submitForms
  // Functions
  function buildQuiz() {
    // variable to store the HTML output
    const output = myQuestions[currentSlide];
    if (currentSlide < myQuestions.length) {

      let element = []

      for (let i = 0; i < output.answers.length; i++) {
        element.push(
          `<div class="quiz__group">
            <input type="radio" class="quez__radio" id="rad-${i}" name="quez" value='${output.answers[i]}'/>
            <label class="quez__item" for="rad-${i}">${output.answers[i]}</label>
          </div>`
        )
      }
      
      quizTitle.innerHTML = `<span>${currentSlide + 1}.&nbsp;${output.question}</span>`
      quizContainer.innerHTML = element.join("");
    }

    allQuestions.innerHTML = myQuestions.length

    checkCurrentQuestion()
  }

  function checkCurrentQuestion() {
    if (currentSlide === myQuestions.length) {
      currentQuestion.innerHTML = 0
    } else {
      currentQuestion.innerHTML = myQuestions.length - currentSlide
    }
  }

  function addValue() {
    let checkbox = document.getElementsByName("quez");

    for (let i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked) {
        answers.answer.push(checkbox[i].value)
      }
    }
  }

  function deleteValue() {
    answers.answer.pop();
  }

  function progressUpdate() {
    if (currentSlide < myQuestions.length) {
      const currentValue = ((currentSlide + 1) / myQuestions.length) * 100 + '%';
      proggressBar.style.width = currentValue;
    }
  }

  function showSlide(n) {
    currentSlide = n;
    if (currentSlide === 0) {
      previousButton.style.display = 'none';
      attentionText.style.display = 'none';
    } else {
      previousButton.style.display = 'inline-block';
    }
    if (currentSlide === myQuestions.length) {
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
      attentionText.style.display = 'inline-block';
    } else {
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
      attentionText.style.display = 'none';
    }
  }

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  
  const validate = () => {
    const email = emailInput.value;
    if (validateEmail(email)) {
      emailInput.classList.add("success");
      attentionText.classList.add("success");
      emailInput.classList.remove("error");
      attentionText.classList.remove("error");

      return true
    } else {
      emailInput.classList.add("error");
      attentionText.classList.add("error");
      emailInput.classList.remove("success");
      attentionText.classList.remove("success");

      return false;
    }
  }

  function showContact() {
    if (currentSlide === myQuestions.length) {
      quizTitle.innerHTML = submitForms[0].title

      let output = [];
      submitForms[0].inputs.forEach((item) => {
        output.push(
          `<div class="quiz__group quiz__group--12">
            <input type="${item.type}" class="quez__input qContact" name="${item.type}" ${item.type == 'email' ? 'id="email"' : ''} placeholder='${item.placeholder}' ${item.required ? 'required' : ''}/>
          </div>`
        )
      })

      quizContainer.innerHTML = output.join("");
      
      emailInput = document.getElementById('email');
      emailInput.addEventListener('input', validate);
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
    progressUpdate();
    addValue();
    setTimeout(() => {
      buildQuiz();
      showContact();
    }, 100);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
    progressUpdate();
    deleteValue();
    setTimeout(() => {
      buildQuiz();
      showContact();
    }, 100);
  }

  function showSuccess() {
    if (validate()) {
      quizWrapper.style.display = 'none';
      quizSuccess.style.display = 'flex';
    }
  }

  function restartQuiz() {
    answers.answer = []
    answers.contact = []
    currentSlide = 0
    quizWrapper.style.display = 'flex';
    quizSuccess.style.display = 'none';
    emailInput.classList.remove("success", "error");
    attentionText.classList.remove("success", "error");
    showSlide(currentSlide);
    buildQuiz();
    progressUpdate();
  }


  async function sendData() {
    let contactInput = document.getElementsByClassName('qContact');

    for (let i = 0; i < contactInput.length; i++) {
      answers.contact.push(contactInput[i].value)
    }

    if (validate()) {
      await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(answers),
      }).then((res) => {
        if (res.status === 201) {
          showSuccess();
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  // Kick things off
  buildQuiz();
  progressUpdate();
  showContact();
  // Show the first slide
  showSlide(currentSlide);

  // Event listeners
  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    sendData();
  });
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
  restartBtn.addEventListener("click", restartQuiz);

})();