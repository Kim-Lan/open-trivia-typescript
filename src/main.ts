import './css/style.css'

function init(): void {
  fetchNewQuestion();
}

function renderQuestion(question: string): void {
  const questionElement = document.getElementById('question') as HTMLElement;
  questionElement.innerHTML = question;
}

function fetchNewQuestion(): void {
  fetch('https://opentdb.com/api.php?amount=1&type=multiple')
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.results[0]);
      renderQuestion(data.results[0].question);
    });
}

document.addEventListener('DOMContentLoaded', init);
