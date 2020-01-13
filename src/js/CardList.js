import Card from './Card';
import userInfo from './userInfo';
import {popupPicture} from './PopupPicture';

export default class CardList {
    constructor(containerObject) {
        this.containerObject = containerObject;
        this.containerObject.addEventListener("click", function (event) {
            const card = event.target;
            if (card.classList.contains("place-card__image") && !card.classList.contains("place-card__delete-icon")) {
                const link = card.style.backgroundImage;
                popupPicture.open(link.slice(5, -2));
            }
        }.bind(this));
    }
    addCard(card) {
        const {
            obj
        } = new Card(card.name, card.link, card.likes, card._id);
        if (card.owner._id === userInfo.id) {
            obj.querySelector(".place-card__delete-icon").classList.add("place-card__delete-icon_visible");
        }
        this.containerObject.appendChild(obj);
    }
    render(array) {
        for (let i = 0; i < array.length; i++) {
            this.addCard(array[i]);
        }
    }
}