import './css/style.css'
import { shuffleArray } from './util.ts'

let currentCorrectAnswer: string = '';

function init(): void {
  fetchNewQuestion();

  const nextQuestionButton = document.getElementById('nextQuestionButton') as HTMLButtonElement;
  nextQuestionButton.addEventListener('click', (event: Event) => {
    event.preventDefault();
    fetchNewQuestion();
  });
}

function renderQuestion(question: string): void {
  const questionElement = document.getElementById('question') as HTMLElement;
  questionElement.innerHTML = question;
}

function renderChoices(correctAnswer: string, incorrectAnswers: string[]): void {
  currentCorrectAnswer = correctAnswer;

  let choices: string[] = [correctAnswer, ...incorrectAnswers];
  choices = shuffleArray(choices);
  
  const choicesElement = document.getElementById('choices') as HTMLUListElement;
  choicesElement.innerHTML = '';

  choices.forEach(choice => {
    const liElement = document.createElement('li') as HTMLLIElement;
    const buttonElement = document.createElement('button') as HTMLButtonElement;
    buttonElement.innerHTML = choice;
    buttonElement.className = 'rounded-lg p-2 border-gray-800 border-2 hover:bg-gray-400 active:bg-gray-600';

    buttonElement.addEventListener('click', onChoiceSelected);

    liElement.appendChild(buttonElement);
    choicesElement.appendChild(liElement);
  });
}

function onChoiceSelected(event: Event): void {
  const target: EventTarget = event.target;
  const selectedChoice: string = target.innerHTML;
  
  if (selectedChoice === currentCorrectAnswer) {
    target.classList.add('bg-green-500');
  } else {
    target.classList.add('bg-red-500');
  }
}

function fetchNewQuestion(): void {
  fetch('https://opentdb.com/api.php?amount=1&type=multiple')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderQuestion(data.results[0].question);
      renderChoices(data.results[0].correct_answer, data.results[0].incorrect_answers);
    });
}

document.addEventListener('DOMContentLoaded', init);
