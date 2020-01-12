const initialCards = [{
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
    },
    {
        name: "Нургуш",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg"
    },
    {
        name: "Тулиновка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg"
    },
    {
        name: "Остров Желтухина",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg"
    },
    {
        name: "Владивосток",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg"
    }
];

const errorList = {
    emptyField: "Это поле обязательное",
    wrongLength: "Должно быть от 2 до 30 символов",
    wrongURL: "Здесь должны быть ссылка"
};

const MAX_CARDS = initialCards.length;

const popupPictureWindow = document.querySelector(".popup-picture");

const popupNew = document.querySelector(".popup_new");
const newNameInput = popupNew.querySelector(".popup__input_name");
const newLinkInput = popupNew.querySelector(".popup__input_link");
const buttonNew = document.querySelector(".user-info__button");

const popupEdit = document.querySelector(".popup_edit");
const editNameInput = popupEdit.querySelector(".popup__input_name");
const editAboutInput = popupEdit.querySelector(".popup__input_about");
const buttonEdit = document.querySelector(".user-info__button_edit");

const commitButtonNew = popupNew.querySelector(".popup__button");
const commitButtonEdit = popupEdit.querySelector(".popup__button");

class Card {
    constructor(name, link) {
        this.name = name;
        this.link = link;
        this.obj = this.create();

        /* Можно лучше: чтобы не придумывать новые имена, при привязке контекста 
        через bind можно записать так:
        this.remove = this.remove.bind(this);
        */
        this.handleRemove = this.remove.bind(this);

        /* Можно лучше: сейчас логичнее отказаться от делегирования и вешать обработчики 
        прям на элементы карточки, тогда в обработчике не придется проверять на каком элементе произошел клик
        можно делать это в функции create */
        this.obj.addEventListener("click", this.like);
        this.obj.addEventListener("click", this.handleRemove);
    }
    like() {
        if (event.target.classList.contains("place-card__like-icon")) {
            event.target.classList.toggle("place-card__like-icon_liked");
        }
    }
    remove() {
        if (event.target.classList.contains("place-card__delete-icon")) {
            this.obj.remove();
            this.obj.removeEventListener("click", this.like);
            this.obj.removeEventListener("click", this.handleRemove);
        }
    }
    create() {
        const card = document.createElement("div");
        const background = document.createElement("div");
        const deleteButton = document.createElement("button");
        const cardDescription = document.createElement("div");
        const cardName = document.createElement("h3");
        const likeButton = document.createElement("button");

        card.classList.add("place-card");

        background.classList.add("place-card__image");
        background.style.backgroundImage = `url(${this.link})`;

        deleteButton.classList.add("place-card__delete-icon");

        background.appendChild(deleteButton);

        cardDescription.classList.add("place-card__description");

        cardName.classList.add("place-card__name");
        cardName.textContent = this.name;

        likeButton.classList.add("place-card__like-icon");

        cardDescription.appendChild(cardName);
        cardDescription.appendChild(likeButton);

        card.appendChild(background);
        card.appendChild(cardDescription);

        return card;
    }
}

class CardList {
    constructor(containerObject, array) {
        this.containerObject = containerObject;
        this.array = array;
        this.render();
    }
    addCard(name, link) {
        const {
            obj
        } = new Card(name, link);
        this.containerObject.appendChild(obj);
    }
    render() {
        /* Надо исправить: здесь следует брать this.array.length, а не MAX_CARDS */
        for (let i = 0; i < MAX_CARDS; i++) {
            this.addCard(this.array[i].name, this.array[i].link);
        }
    }
}

const cardsContainer = new CardList(document.querySelector(".places-list"), initialCards);

class Popup {
    constructor(popupObject) {
        this.popupObject = popupObject;
        this.firstField = popupObject.querySelectorAll(".popup__input")[0];
        this.secondField = popupObject.querySelectorAll(".popup__input")[1];
        this.firstFieldValid = false;
        this.secondFieldValid = false;
        this.commitButton = popupObject.querySelector(".popup__button");    
        this.popupObject.addEventListener("click", function (event) {
            if (event.target.classList.contains("popup__close")) {
                this.close();
            }
        }.bind(this));
        this.firstField.addEventListener("input", function (event) {
            this.firstFieldValid = checkInput(this.firstField);
        }.bind(this));
        this.secondField.addEventListener("input", function (event) {
            this.secondFieldValid = checkInput(this.secondField);
        }.bind(this));
    }
    close() {
        this.popupObject.classList.remove("popup_is-opened");
        this.firstFieldValid = false;
        this.secondFieldValid = false;
        disableButton(this.commitButton);
    }
}

class PopupNew extends Popup {
    constructor(popupObject) {
        super(popupObject);
        document.forms.new.addEventListener("submit", this.submit.bind(this));
        document.forms.new.addEventListener("input", function(event){
            if (this.firstFieldValid && this.secondFieldValid){
                activateButton(this.commitButton);
            } else {
                disableButton(this.commitButton);
            }
        }.bind(this));
    }
    submit(event) {
        event.preventDefault();

        const form = document.forms.new;
        const name = form.elements.name;
        const link = form.elements.link;

        if (this.firstFieldValid && this.secondFieldValid) {
            /* Можно лучше: не нужно привязывать класс к глобальной переменной cardsContainer, т.к. 
            это затрудняет переиспользование кода. Лучше передать ссылку на глобальную переменную
            через конструктор класса
             */
            cardsContainer.addCard(name.value, link.value);
            this.close();
        }
    }
    open() {
        this.popupObject.classList.add("popup_is-opened");
        this.firstField.value = "";
        this.secondField.value = "";
        checkInput(newLinkInput);
    }
}

class PopupEdit extends Popup {
    constructor(popupObject) {
        super(popupObject);
        document.forms.edit.addEventListener("submit", this.submit.bind(this));
        document.forms.edit.addEventListener("input", function(event){
            if (this.firstFieldValid && this.secondFieldValid){
                activateButton(this.commitButton);
            } else {
                disableButton(this.commitButton);
            }
        }.bind(this));
    }
    submit(event) {
        event.preventDefault();

        const form = document.forms.edit;
        const name = form.elements.name;
        const about = form.elements.about;

        if (this.firstFieldValid && this.secondFieldValid) {
            document.querySelector(".user-info__name").textContent = name.value;
            document.querySelector(".user-info__job").textContent = about.value;
            this.close();
        }
    }
    open() {
        this.popupObject.classList.add("popup_is-opened");
        this.firstField.value = document.querySelector(".user-info__name").textContent;
        this.secondField.value = document.querySelector(".user-info__job").textContent;
        this.firstFieldValid = checkInput(editNameInput);
        this.secondFieldValid = checkInput(editAboutInput);
    }
}

class PopupPicture {
    constructor(popupPictureObject) {
        this.popupObject = popupPictureObject;
        this.popupObject.addEventListener("click", function (event) {
            if (event.target.classList.contains("popup__close")) {
                this.close();
            }
        }.bind(this));
    }
    open(link) {
        this.popupObject.classList.add("popup-picture_is-opened");
        this.popupObject.querySelector(".popup-picture__content").src = link;
    }
    close() {
        this.popupObject.classList.remove("popup-picture_is-opened");
    }
}

const _popupNew = new PopupNew(document.querySelector(".popup_new"));
const _popupEdit = new PopupEdit(document.querySelector(".popup_edit"));
const _popupPicture = new PopupPicture(document.querySelector(".popup-picture"));

/* Можно лучше: можно отказаться от делегирования и вешать обработчики в классе Card на элементы карточки
   как это сделано для лайка и удаления. Так весь функционал карточки будет сосредоточен в одном месте, что гораздо
   лучше для структуры программы */
cardsContainer.containerObject.addEventListener("click", function (event) {
    const card = event.target;
    if (card.classList.contains("place-card__image") && !card.classList.contains("place-card__delete-icon")) {
        const link = card.style.backgroundImage;
        _popupPicture.open(link.slice(5, -2));
    }
});

const disableButton = function(commitButton) {
    commitButton.classList.remove("popup__button_active");
    commitButton.disabled = true;
};

const activateButton = function(commitButton) {
    commitButton.classList.add("popup__button_active");
    commitButton.disabled = false;
};

const isValidName = function (element) {
    return !isEmpty(element) && !isWrongLength(element);
}

const isEmpty = function (element) {
    return element.length === 0;
};

const isWrongLength = function (element) {
    return element.length < 2 || element.length > 30;
};

const isLink = function (str) {
    regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    return regexp.test(str);
};

const nameValidation = function (answer) {
    if (isEmpty(answer)) {
        return errorList.emptyField;
    }
    if (isWrongLength(answer)) {
        return errorList.wrongLength;
    }
    return true;
};

const linkValidation = function (answer) {
    if (isEmpty(answer)) {
        return errorList.emptyField;
    }
    if (!isLink(answer)) {
        return errorList.wrongURL;
    }
    return true;
};

const checkInput = function (eventTarget) {
    const check =
        eventTarget === newLinkInput ?
        linkValidation(eventTarget.value) :
        nameValidation(eventTarget.value);
    const errorMsg = eventTarget.parentNode.querySelector(".popup__error");
    if (check !== true) {
        errorMsg.classList.add("popup__error_active");
        errorMsg.textContent = check;
        return false;
    } else {
        errorMsg.classList.remove("popup__error_active");
        errorMsg.textContent = "";
        return true;
    }
};

buttonEdit.addEventListener("click", function (event) {
    _popupEdit.open();
});

buttonNew.addEventListener("click", function (event) {
    _popupNew.open();
});

/*
    Код хорошо оформлен.
    Классы Card и CardList сделаны хорошо, в них нет никакой лишней функциональности,
    при удалении карточки удаляются обработчики и метод this.remove привязан к контексту класса.

    Отлично, что в классе Popup описывается только общий функционал для двук попапов, а потом
    с помощью наследования его функциональнсть расширяется под конкретный попап.
    Так же хорошо сделано, что в метод open класса PopupPicture передается ссылка на изображение.

    Очень хорошая работа.
    Есть одно замечание где нужно поправить (MAX_CARDS в классе CardList), но не стал из за этого отправлять на доработку.
*/