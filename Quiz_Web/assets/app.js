let configuration = { 'difficulty': 'easy', 'category': 11, 'numberOfQuestions': 10 }

const getUrlApi = ({ numberOfQuestions, category, difficulty }) =>
  `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`

let questions = []
let currentQuestion = 0
let question = {}
let answers = []
let points = 0
let historyArr = [] 
let i = 0
const resetQuiz = () => {

  formReset()

  questions = []
  currentQuestion = 0
  question = {}
  answers = []
  points = 0
  historyArr = []
  i = 0
}

// selectors
const shareButton = document.querySelector('#share')
const modal = document.querySelector('.modal')
const modalConfig = document.querySelector('#config-modal.modal')
const closeConfigButton = document.querySelector('.close-config-modal')
const formConfig = document.querySelector('form#config-form')
const pointsPainel = document.querySelector('#points')
const questionQuote = document.querySelector('#question-quote')
const anwerZero = document.querySelector('#anwer-zero')
const anwerOne = document.querySelector('#anwer-one')
const anwerTwo = document.querySelector('#anwer-two')
const anwerThree = document.querySelector('#anwer-three')
const nextButton = document.querySelector('#next')
const previousButton = document.querySelector('#previous')
const currentQuestionElement = document.querySelector('#current-question')
const numberOfQuestionsElement = document.querySelector('#number-of-questions')
const anwerListElement = document.querySelector('div.list-group')
const form = document.querySelector('form')
const finishButton = document.querySelector('a#finish')
const configurationElement = document.querySelector('a#configuracao')
const listGroupElement = document.querySelector('div.list-group')
const errorAudio = document.querySelector("#error-audio");
const successAudio = document.querySelector("#success-audio");
const muteButton = document.querySelector("#mute-button");
const mutedBanArea = document.querySelector('span#ban-area')

const anwer0 = document.querySelector('#anwer0')
const anwer1 = document.querySelector('#anwer1')
const anwer2 = document.querySelector('#anwer2')
const anwer3 = document.querySelector('#anwer3')

// end selectors

// functions

const muteToggle = () => {

  const banHTML = '<i class="fa fa-ban fa-stack-2x" style="color: tomato;"></i>'

  if (errorAudio.muted === true) {

    errorAudio.muted = false
    successAudio.muted = false

    mutedBanArea.innerHTML = null

    return

  }

  errorAudio.muted = true
  successAudio.muted = true

  mutedBanArea.innerHTML = banHTML

  return

}

const shuffle = array => {
 
  let ctr = array.length
  let temp
  let index

  // While there are elements in the array
  while (ctr > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * ctr)
    // Decrease ctr by 1
    ctr--
    // And swap the last element with it
    temp = array[ctr]
    array[ctr] = array[index]
    array[index] = temp
  }
  return array
}

const clearAllOptions = () => {

  const allOptions = document.querySelectorAll('div.list-group a')
  allOptions.forEach(option => option.classList.remove('active'))

}

const formReset = () => {

  form.reset()
  clearAllOptions()


}

const configure = (difficulty, numberOfQuestions, category) => {

  configuration = { difficulty, category, numberOfQuestions }

  return

}

const showModal = (title, message, error) => {

  modal.querySelector('.modal-body').innerHTML = message

  if (error) {

    modal.querySelector('.modal-header').classList.add('bg-danger')
    modal.querySelector('.modal-body').classList.add('bg-danger')
    modal.querySelector('.modal-footer').classList.add('bg-danger')
    modal.querySelector('.modal-title').innerHTML = `<i class="fa fa-exclamation fa-fw"></i> ${title}`

    errorAudio.play()

  } else {

    modal.querySelector('.modal-header').classList.add('bg-success')
    modal.querySelector('.modal-body').classList.add('bg-success')
    modal.querySelector('.modal-footer').classList.add('bg-success')
    modal.querySelector('.modal-title').innerHTML = `<i class="fa fa-check fa-fw"></i> ${title}`

    successAudio.play()

  }

  modal.setAttribute('style', 'display:block')

  if (error) {

    modal.classList.add('ahashakeheartache')
  }

}

const fetchQuestions =  async () => {

  resetQuiz()

  fetch(getUrlApi(configuration)).then( response => {

    return response.json()


  }).then( data => {

    boot(data)

  }).catch(error => {

    const applicationError = true

    const message = `Ocorreu um erro ao tentar pegar as penguntas da API.<br>
              <br>
              URL:
              <br>
              <a class="link" href="${getUrlApi(configuration)}" target="_blank">${getUrlApi(configuration)}</a>
              <br>
              ERRO:
              <br>
              <b>${error}</b>
              `

    showModal('Applicaton Error', message, applicationError)


  })


}


const render = () => {

  formReset()

  pointsPainel.textContent = points
  question = questions[currentQuestion]
  questionQuote.innerHTML = question.question
  anwerZero.innerHTML = question.correct_answer
  question.answers = shuffle([question.correct_answer, ...question.incorrect_answers])
 
  
  anwerZero.innerHTML  = question.answers[0]
  anwerOne.innerHTML   = question.answers[1]
  anwerTwo.innerHTML   = question.answers[2]
  anwerThree.innerHTML = question.answers[3]
  

  currentQuestionElement.textContent = currentQuestion + 1

  numberOfQuestionsElement.textContent = configuration.numberOfQuestions


}

const goTo = questionIndex => {

  question = questions[currentQuestion]
  currentQuestion = questionIndex

  render()
}



const closeModal = () => {

  modal.setAttribute('style', 'display:hide')

  modal.querySelector('.modal-header').classList.remove('bg-danger')
  modal.querySelector('.modal-body').classList.remove('bg-danger')
  modal.querySelector('.modal-footer').classList.remove('bg-danger')
  modal.querySelector('.modal-header').classList.remove('bg-success')
  modal.querySelector('.modal-body').classList.remove('bg-success')
  modal.querySelector('.modal-footer').classList.remove('bg-success')
  modal.querySelector('.modal-title').innerHTML = ''

  modal.classList.remove('ahashakeheartache')

  modal.querySelector('.modal-body').textContent = null

}

const showModalConfig = () => {

  formConfig.difficulty.value = configuration.difficulty
  formConfig.category.value = configuration.category
  formConfig.numberOfQuestions.value = configuration.numberOfQuestions

  modalConfig.setAttribute('style', 'display:block')

}

const closeModalConfig = () => 
  modalConfig.setAttribute('style', 'display:hide')

const finishQuiz = () => {


  showModal('Congratulations!', `The game is over. You had ${i}/${configuration.numberOfQuestions} correct answers : ${historyArr} . New game is starting .... `,false) 



  setTimeout(() => {
    closeModal()
    fetchQuestions()
  }, 10000);

}


const boot = (questionsData) => {
  questions = questionsData.results
  render()

}

// end functions 


// listeners

shareButton.addEventListener('click', event => {

  event.preventDefault()


  if(navigator.share){

    navigator.share({title: document.title, text: window.location.href, url: window.location.href})
    .then(() => console.log('Obrigado por compartilhar <3'),
    error => console.log('Erro ao compartilhar:', error));

    return 
  }

  console.log('n??o ?? possivel realizar essa opera????o')

})

muteButton.addEventListener('click', event => {

  event.preventDefault()

  muteToggle()


  return

})

listGroupElement.addEventListener('click', event => {

  const selectedOption = document.querySelector(`[data-js="${event.target.dataset.js}"]`)

  clearAllOptions()
  selectedOption.classList.toggle('active')

  const radio = selectedOption.querySelector('input')

  radio.checked = true

})

formConfig.addEventListener('submit', event => {

  event.preventDefault()

  configure(event.target.difficulty.value, event.target.numberOfQuestions.value, event.target.category.value)

  fetchQuestions()
  closeModalConfig()


  return

})

configurationElement.addEventListener('click', event => {

  event.preventDefault()

  showModalConfig()
})


finishButton.addEventListener('click', event => {

  event.preventDefault()

  finishQuiz()

  return

})
//n??t ti???n
nextButton.addEventListener('click', event => {

  event.preventDefault()

  if (currentQuestion + 1 < configuration.numberOfQuestions) {

    const questionIndex = currentQuestion + 1

    goTo(questionIndex)

    return
  }

})
//n??t l??i
previousButton.addEventListener('click', event => {

  event.preventDefault()

  if (currentQuestion - 1 >= 0) {

    const questionIndex = currentQuestion - 1

    goTo(questionIndex)

    return
  }

})

modal.addEventListener('click', event => {

  event.preventDefault()

  clickedElementTag = event.target.tagName

  haveCloseClass = event.target.classList.contains('close') || event.target.classList.contains('close-modal')

  if(haveCloseClass){

    closeModal()
  }

})

closeConfigButton.addEventListener('click', event => {

  event.preventDefault()

  closeModalConfig()

})

form.addEventListener('submit', event => {

  event.preventDefault()
console.log(123);
  questions[currentQuestion].selectedAnswerIndex = Number(event.target.a.value)

  const resposta = question.answers[event.target.a.value]
  // const selectedOption = document.querySelector('#1');
  var xxx = 0
  if(question.answers[0] == question.correct_answer){ xxx = 0}
  if(question.answers[1] == question.correct_answer){ xxx = 1}
  if(question.answers[2] == question.correct_answer){ xxx = 2}
  if(question.answers[3] == question.correct_answer){ xxx = 3}

  if (resposta === question.correct_answer) {

    if (event.target.a.value == 0) {
      anwer0.classList.remove('active')
      anwer0.classList.add('bg-success')
    } 
    if(event.target.a.value == 1) {
      anwer1.classList.remove('active')
      anwer1.classList.add('bg-success')
    }
    if(event.target.a.value == 2) {
      anwer2.classList.remove('active')
      anwer2.classList.add('bg-success')
    }
    if(event.target.a.value == 3) {
      anwer3.classList.remove('active')
      anwer3.classList.add('bg-success')
    }

    points += 10
    historyArr.push(currentQuestion + 1)
    i += 1
  } else {
    if (event.target.a.value == 0) {
      anwer0.classList.remove('active')
      anwer0.classList.add('bg-danger')
    } 
    if(event.target.a.value == 1) {
      anwer1.classList.remove('active')
      anwer1.classList.add('bg-danger')
    }
    if(event.target.a.value == 2) {
      anwer2.classList.remove('active')
      anwer2.classList.add('bg-danger')
    }
    if(event.target.a.value == 3) {
      anwer3.classList.remove('active')
      anwer3.classList.add('bg-danger')
    }

    if (xxx == 0) {
      anwer0.classList.add('bg-success')
    } 
    if(xxx == 1) {
      anwer1.classList.add('bg-success')
    }
    if(xxx == 2) {
      anwer2.classList.add('bg-success')
    }
    if(xxx == 3) {
      anwer3.classList.add('bg-success')
    }
  }
  setTimeout(() => {
    
    anwer0.classList.remove('bg-danger','bg-success')
    anwer1.classList.remove('bg-danger','bg-success')
    anwer2.classList.remove('bg-danger','bg-success')
    anwer3.classList.remove('bg-danger','bg-success')
  event.target.reset()

  if (currentQuestion + 1 < configuration.numberOfQuestions) {

    goTo(currentQuestion + 1)

  } else {

    finishQuiz()

  }
}, 1000);


})

// end listeners


fetchQuestions()