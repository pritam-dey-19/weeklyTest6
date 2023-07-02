const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const definitionContainer = document.getElementById('definitionContainer');

searchButton.addEventListener('click', () => {
  const word = searchInput.value.trim();
  if (word) {
    getDefinition(word);
  }
});

async function getDefinition(word) {
  definitionContainer.innerHTML = '';
  const apiKey = '8e7e9b53-99ed-44fa-8efd-205d450919f4';
  const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      const firstEntry = data[0];
      const definition = firstEntry.shortdef ? firstEntry.shortdef[0] : 'Definition not found.';
      const pronunciation = firstEntry.hwi?.prs[0]?.mw || 'Pronunciation not found.';

      const definitionElement = document.createElement('p');
      definitionElement.innerHTML = `<strong>Definition:</strong> ${definition}`;

      const pronunciationElement = document.createElement('p');
      pronunciationElement.innerHTML = `<strong>Pronunciation:</strong> ${pronunciation}`;

      definitionContainer.appendChild(definitionElement);
      definitionContainer.appendChild(pronunciationElement);
    } else {
      definitionContainer.innerHTML = 'Word not found.';
    }
  } catch (error) {
    console.log('Error:', error);
    definitionContainer.innerHTML = 'An error occurred while fetching data.';
  }
}