"use strick"

document.addEventListener("DOMContentLoaded", function () {
  // Variables
  const nextButton = document.getElementById('next');
  const prevButton = document.getElementById('previous');
  const submitButton = document.querySelector('.quez button[type=submit]');
  const quizBlocks = document.getElementsByClassName('quez__list');
  const proggressBar = document.getElementById('progress');
  const allQuestion = document.getElementById('all');
  const currentQuestion = document.getElementById('current');
  const otherInput = document.querySelectorAll('[data-tab]');
  const quizInputs = document.querySelectorAll('.quez input[type="radio"]:checked');
  const emailInput = document.querySelector('.quez input[type="email"]');
  const attentionText = document.getElementById('attention');
  const quezForm = document.querySelector('#quez__form');
  const quizWrapper = document.getElementById('quez-wrapper');
  const quizSuccess = document.getElementById('success');
  const restartBtn = document.getElementById('reset');

  let currentSlide = 0;

  // QUIZ STEP INFO
  const quizStepInfo = () => {
    allQuestion.innerHTML = quizBlocks.length - 1;
    currentQuestion.innerHTML = (quizBlocks.length - 1) - currentSlide;
  };

  // progressBar function
  const progressUpdate = () => {
    if (currentSlide < quizBlocks.length) {
      const currentValue = ((currentSlide + 1) / quizBlocks.length) * 100 + '%';
      proggressBar.style.width = currentValue;
    }
  };

  //show hide button
  const showSlide = (n) => {
    currentSlide = n;
    if (currentSlide === 0) {
      prevButton.style.display = 'none';
    } else {
      prevButton.style.display = 'inline-block';
    }
    if (currentSlide === (quizBlocks.length - 1)) {
      nextButton.style.display = 'none';
      submitButton.style.display = 'block';
    } else {
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
    [].forEach.call(quizBlocks, function (el) {
      el.classList.remove("quez__list--active");
    });
    quizBlocks[currentSlide].classList.add('quez__list--active');
  };

  // SHOW OTHER INPUT
  const showOtherVariant = (e) => {
    const currentTarget = e.target;
    const getOtherInput = currentTarget.parentElement.querySelector('.quez__other');
    document.getElementById('quiz').addEventListener('change', () => {
      currentTarget.checked ? getOtherInput.style.display = "block" : getOtherInput.style.display = "none";
      getOtherInput.focus();
    })
  }

  // SHOW NEXT SLIDE
  const showNextSlide = () => {
    showSlide(currentSlide + 1);
    quizStepInfo();
    progressUpdate();
  };

  // SHOW PREV SLIDE
  const showPreviousSlide = () => {
    showSlide(currentSlide - 1);
    quizStepInfo();
    progressUpdate();
  };

  // VALIDATE EMAIL INPUT
  const validateEmail = (email) => {
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
  };

  //RESTART FORM
  const restartQuiz = () => {
    currentSlide = 0
    quezForm.reset()
    quizWrapper.style.display = 'flex';
    quizSuccess.style.display = 'none';
    emailInput.classList.remove("success", "error");
    attentionText.classList.remove("success", "error");
    showSlide(currentSlide);
    progressUpdate();

    document.querySelectorAll('.quez__other').forEach((item) => {
      item.style.display = 'none';
    });
  }

  //SHOW SUCCESS FORM
  const showSuccess = () => {
    quizWrapper.style.display = 'none';
    quizSuccess.style.display = 'flex';
  };

  //SUBMIT FORMS
  const submitForm = async (e) => {

    let formData = $('#quez__form').serializeArray();
    if (validate()) {
      await fetch('sendmail.php', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      }).then((res) => {
        if (res.status === 201) {
          showSuccess();
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  // INIT
  quizStepInfo();
  progressUpdate();
  showSlide(currentSlide);


  //EVENT LISTENER
  emailInput.addEventListener('input', validate);
  prevButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
  restartBtn.addEventListener("click", restartQuiz);
  submitButton.addEventListener("click", function(e) {
    e.preventDefault();
    submitForm()
  });
  otherInput.forEach(tab => {
    tab.addEventListener('click', showOtherVariant);
  })
});