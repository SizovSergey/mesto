let profileName = document.querySelector('.profile__user-name');
let profileJob = document.querySelector('.profile__user-info');
let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-job');
let closeButton = document.querySelector('.popup__cancel-button');
let saveButton = document.querySelector('.popup__save-button');


function openPopup() {
    popup.classList.add('popup__opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}
editButton.addEventListener('click', openPopup);

function closePopup() {
    popup.classList.remove('popup__opened');
}
closeButton.addEventListener('click', closePopup);

function handleFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closePopup();
}

popupForm.addEventListener('submit', handleFormSubmit); 