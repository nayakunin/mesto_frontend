import {Validation} from './Validation';

export default class Popup {
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
    }
    close() {
        this.popupObject.classList.remove("popup_is-opened");
        this.firstFieldValid = false;
        this.secondFieldValid = false;
        Validation.disableButton(this.commitButton);
    }
}