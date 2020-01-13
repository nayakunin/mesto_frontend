import '../pages/index.css'

const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort2' : 'https://praktikum.tk/cohort2';

import userInfo from './js/userInfo';
import Api from './js/Api';
import CardList from './js/CardList';
import PopupAvatar from './js/PopupAvatar';

export const api = new Api({
    baseUrl: serverUrl,
    headers: {
        authorization: 'b8b0ebd5-5fbc-41a6-b6b4-fb9a39bce3bb',
        'Content-Type': 'application/json'
    }
})

export const cardsContainer = new CardList(document.querySelector(".places-list"));

api.getInitialCards().then(data => {
    if (data) {
        cardsContainer.render(data)
    }
});

import PopupNew from './js/PopupNew';
import PopupEdit from './js/PopupEdit';

export const headerName = document.querySelector(".user-info__name");
export const headerAbout = document.querySelector(".user-info__job");
export const headerAvatar = document.querySelector(".user-info__photo");




const buttonNew = document.querySelector(".user-info__button");
const buttonEdit = document.querySelector(".user-info__button_edit");

const _popupNew = new PopupNew(document.querySelector(".popup_new"));
const _popupEdit = new PopupEdit(document.querySelector(".popup_edit"));
const _popupAvatar = new PopupAvatar(document.querySelector(".popup_avatar"));

buttonEdit.addEventListener("click", function (event) {
    _popupEdit.open();
});

buttonNew.addEventListener("click", function (event) {
    _popupNew.open();
});

headerAvatar.addEventListener("click", function (event) {
    _popupAvatar.open();
})

api.updatePersonalInfo()
    .then(res => {
        if (res) {
            headerName.textContent = res.name;
            headerAbout.textContent = res.about;
            headerAvatar.style.backgroundImage = `url(${res.avatar})`;
            userInfo.id = res._id;
        }
    })