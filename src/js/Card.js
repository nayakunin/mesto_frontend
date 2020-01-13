import userInfo from './userInfo';

import {api} from "../script"

export default class Card {
    constructor(name, link, likes, id) {
        this.name = name;
        this.link = link;
        this.likes = likes;
        this.id = id;
        this.obj = this.create();
        this.remove = this.remove.bind(this);
        this.obj.addEventListener("click", this.toogleLike.bind(this));
        this.obj.addEventListener("click", this.remove.bind(this));
    }
    updateLikeCounter(likesArray) {
        this.likes = likesArray;
        this.obj.querySelector(".place-card__like-counter").textContent = this.likes.length;
    }
    toogleLike() {
        if (event.target.classList.contains("place-card__like-icon")) {
            if (!event.target.classList.contains("place-card__like-icon_liked")) {
                api.likeCard(this)
                    .then(data => {
                        this.updateLikeCounter(data.likes);
                    })
            } else {
                api.dislikeCard(this)
                    .then(data => {
                        if (data.likes && data.likes.length > 0) {
                            this.updateLikeCounter(data.likes);
                        }
                    })
            }
            event.target.classList.toggle("place-card__like-icon_liked");
        }
    }
    remove() {
        if (event.target.classList.contains("place-card__delete-icon")) {
            if (window.confirm("confirm?")) {
                api.deleteCard(this);
                this.obj.remove();
                this.obj.removeEventListener("click", this.like);
                this.obj.removeEventListener("click", this.handleRemove);
            }
        }
    }
    create() {
        const card = document.createElement("div");
        const background = document.createElement("div");
        const deleteButton = document.createElement("button");
        const cardDescription = document.createElement("div");
        const cardName = document.createElement("h3");
        const likeContainer = document.createElement("div");
        const likeButton = document.createElement("button");
        const likeCounter = document.createElement("div");


        card.classList.add("place-card");

        background.classList.add("place-card__image");
        background.style.backgroundImage = `url(${this.link})`;

        deleteButton.classList.add("place-card__delete-icon");

        background.appendChild(deleteButton);

        cardDescription.classList.add("place-card__description");

        cardName.classList.add("place-card__name");
        cardName.textContent = this.name;

        likeButton.classList.add("place-card__like-icon");

        likeCounter.classList.add("place-card__like-counter");
        this.likes.forEach(function (element) {
            if (element._id === userInfo.id) {
                likeButton.classList.add("place-card__like-icon_liked");
            }
        })
        likeCounter.textContent = this.likes.length;

        likeContainer.classList.add("place-card__like-container");

        likeContainer.appendChild(likeCounter);
        likeContainer.appendChild(likeButton);

        cardDescription.appendChild(cardName);
        cardDescription.appendChild(likeContainer);

        card.appendChild(background);
        card.appendChild(cardDescription);

        return card;
    }
}
