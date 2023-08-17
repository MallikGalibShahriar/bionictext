const textInput = document.getElementById('textInput');
const boldifyBtn = document.getElementById('boldifyBtn');
const output = document.getElementById('output');

function shouldBlackifyEnding(word) {
  const endingPatterns = ['ing', 'ed', 'fy', 'ize', 'ise', 'able', 'ful', 'ism'];
  for (const pattern of endingPatterns) {
    if (word.endsWith(pattern)) {
      return pattern;
    }
  }
  return false;
}

function getModifiedWord(word) {
  
  if (word === "'" || word === '"') {
    return `<span class="orange">${word}</span>`;
  }

  if (word.startsWith("'") || word.startsWith('"')) {
    const quote = word[0];
    const closingQuoteIndex = word.lastIndexOf(quote);

    if (closingQuoteIndex !== -1) {
      const quotedPortion = word.substring(1, closingQuoteIndex);
      const restPart = word.substring(closingQuoteIndex + 1);

      return `${quote}<span class="orange">${quotedPortion}</span>${quote}${restPart}`;
    }
  }

  const endingPattern = shouldBlackifyEnding(word);
  if (endingPattern) {
    const prefixPart = word.slice(0, word.length - endingPattern.length);
    const endingPart = word.slice(word.length - endingPattern.length);
    return `${prefixPart}<span class="black">${endingPart}</span>`;
  }

  if (word.length >= 9) {
    return `<span class="highlight">${word}</span>`;
  }

  if (word.length > 3 && word.length <= 5) {
    const boldPart = word.slice(0, Math.min(2, word.length));
    const restPart = word.slice(Math.min(2, word.length));
    return `<span class="bold">${boldPart}</span>${restPart}`;
  }

  if (word.length >= 6 && word.length <= 8) {
    const boldPart = word.slice(0, 3);
    const restPart = word.slice(3);
    return `<span class="bold">${boldPart}</span>${restPart}`;
  }

  return word;
}

function processText() {
  const inputText = textInput.value;
  const paragraphs = inputText.split('\n');
  const modifiedParagraphs = paragraphs.map((paragraph) => {
    const sentences = paragraph.split('.');
    const modifiedSentences = sentences.map((sentence) => {
      const words = sentence.trim().split(/\s+/);
      const modifiedWords = words.map((word) => {
        const modifiedWord = getModifiedWord(word);
        const punctuation = word.replace(/[a-zA-Z0-9-'.,:;!?"/\[\]\(\)\-–—…\s]/g, '');
        return modifiedWord + punctuation;
      });
      return modifiedWords.join(' ');
    });
    return modifiedSentences.join('. ');
  });
  output.innerHTML = modifiedParagraphs.join('<br>');
}

boldifyBtn.addEventListener('click', processText);
