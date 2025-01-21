import './css/style.css'
import { shuffleArray } from './util.ts'

let currentCorrectAnswer: string = '';

function init(): void {
  fetchNewQuestion();
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
    buttonElement.className = 'rounded-lg p-2 border-gray-800 border-2';

    buttonElement.addEventListener('click', onChoiceSelected);

    liElement.appendChild(buttonElement);
    choicesElement.appendChild(liElement);
  });
}

function onChoiceSelected(event: Event): void {
  const target: HTMLElement = event.target;
  const selectedChoice: string = target.textContent;
  
  if (selectedChoice === currentCorrectAnswer) {
    target.classList.add('correct');
    console.log('Correct!');
  } else {
    target.classList.add('incorrect');
    console.log('Incorrect');
  }
}

function fetchNewQuestion(): void {
  fetch('https://opentdb.com/api.php?amount=1&type=multiple')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.results[0]);
      renderQuestion(data.results[0].question);
      renderChoices(data.results[0].correct_answer, data.results[0].incorrect_answers);
    });
}

document.addEventListener('DOMContentLoaded', init);
