const textInput = document.getElementById('textInput');
const boldifyBtn = document.getElementById('boldifyBtn');
const output = document.getElementById('output');

const commonPrepositions = [
  'about', 'above', 'across', 'after', 'against', 'along', 'among', 'around', 'at', 'before', 'behind', 'below', 'beneath', 'beside', 'between'
];

const prefixSuffixPrefixes = [
  'a-', 'ab-', 'ad-', 'ambi-', 'an-', 'ante-', 'anti-', 'auto-', 'bi-', 'bio-', 'circum-', 'co-', 'com-', 'con-', 'contra-', 'counter-', 'de-', 'demi-', 'di-', 'dis-', 'dys-', 'e-', 'ec-', 'en-', 'ex-', 'extra-', 'fore-', 'hemi-', 'hyper-', 'hypo-', 'il-', 'im-', 'in-', 'ir-', 'inter-', 'intra-', 'intro-', 'macro-', 'mal-', 'micro-', 'mis-', 'mono-', 'multi-', 'non-', 'ob-', 'op-', 'over-', 'para-', 'per-', 'poly-', 'post-', 'pre-', 'pro-', 're-', 'semi-', 'sub-', 'super-', 'sym-', 'syn-', 'tele-', 'trans-', 'tri-', 'ultra-', 'un-', 'under-', 'uni-', 'up-', 'vice-', 'well-', 'with-'
];

const prefixSuffixSuffixes = [
  'able', 'acy', 'age', 'al', 'ance', 'ant', 'ary', 'ate', 'dom', 'ed', 'ee', 'en', 'er', 'es', 'est', 'ess', 'ful', 'hood', 'ible', 'ice', 'ile', 'ing', 'ion', 'ish', 'ist', 'ity', 'ive', 'ize', 'less', 'like', 'ly', 'ment', 'ness', 'ous', 'ship', 'sion', 'tion', 'ture', 'ty', 'ward', 'wise', 'y', 'acious', 'ade', 'agog', 'aholic', 'al', 'an', 'ance', 'ant', 'ard', 'arium', 'ation', 'ative', 'cy', 'cide', 'cracy', 'crat', 'cratic', 'cle', 'cule', 'der', 'dom', 'ee', 'eer', 'ence', 'ency', 'ent', 'er', 'es', 'ese', 'ette', 'ful', 'fy', 'gram', 'graph', 'ian', 'ible', 'ic', 'ice', 'ile', 'ine', 'ing', 'ion', 'ise', 'ish', 'ism', 'ist', 'ite', 'itis', 'ity', 'ive', 'ize', 'ious', 'less', 'logy', 'ly', 'ment', 'ness', 'ous', 'path', 'pathy', 'phile', 'phone', 'phy', 'sion', 'tion', 'tive', 'tude', 'ward', 'ware', 'wise', 'y'
];

function isCommonPreposition(word) {
  return commonPrepositions.includes(word.toLowerCase());
}

function isPrefixSuffixPrefix(word) {
  return prefixSuffixPrefixes.some(prefix => word.startsWith(prefix));
}

function isPrefixSuffixSuffix(word) {
  return prefixSuffixSuffixes.some(suffix => word.endsWith(suffix));
}

function getModifiedWord(word) {
  if (word.length >= 8) {
    return `<span class="underline">${word}</span>`;
  } else if (word.length > 3 && !isCommonPreposition(word)) {
    const consonantIndex = Math.min(word.length - 1, 2);
    const boldPart = word.slice(0, consonantIndex + 1);
    const restPart = word.slice(consonantIndex + 1);
    return `<span class="bold">${boldPart}</span>${restPart}`;
  } else if (isPrefixSuffixPrefix(word) || isPrefixSuffixSuffix(word)) {
    return `<span class="blue">${word}</span>`;
  } else {
    return word;
  }
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
