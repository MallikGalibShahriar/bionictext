const textInput = document.getElementById('textInput');
const boldifyBtn = document.getElementById('boldifyBtn');
const output = document.getElementById('output');

function boldifyText() {
  const inputText = textInput.value;
  const words = inputText.split(' ');
  const formattedWords = words.map((word) => {
    if (word.length > 3) {
      return `<span class="bold">${word.slice(0, 2)}</span>${word.slice(2)}`;
    }
    return word;
  });
  output.innerHTML = formattedWords.join(' ');
}

boldifyBtn.addEventListener('click', boldifyText);