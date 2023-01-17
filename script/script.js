let profileName = document.querySelector('.profile__user-name');
let profileJob = document.querySelector('.profile__user-info');
let editButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let popupForm = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input-name');
let jobInput = document.querySelector('.popup__input-job');
let closeButton = document.querySelector('.popup__cancel-button');
let saveButton = document.querySelector('.popup__save-button');


editButton.addEventListener('click', function() {
    popup.classList.add('popup__opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
});

closeButton.addEventListener('click', function() {
    popup.classList.remove('popup__opened');
});

popupForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    popup.classList.remove('popup__opened');
}); 