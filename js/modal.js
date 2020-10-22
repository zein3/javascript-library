let modal = document.querySelector('.modal');

function openModal () {
  modal.style.display = 'block';
}

function closeModal () {
  modal.style.display = 'none';
}

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
})