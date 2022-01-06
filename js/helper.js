function makeElement (text, elem = 'p', class_ = 'card-text') {
  let cardText = document.createElement(elem);
  cardText.classList.add(class_);
  cardText.textContent = text;
  return cardText
}

function onClick (element, func) {
  element.addEventListener('click', func);
  element.addEventListener('touchStart', func);
}

function loadPlusCard () {
  let plus = document.createElement('h1');
  plus.textContent = '+';
  plus.classList.add('disable-select');

  let card = document.createElement('div');
  card.classList.add('card');
  card.classList.add('card-add');
  onClick(card, openModal);
  card.appendChild(plus);
  library.appendChild(card);
}
