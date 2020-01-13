import Popup from './Popup';
import {Validation} from './Validation';
import {api, cardsContainer} from '../script';

export default class PopupNew extends Popup {
    constructor(popupObject) {
        super(popupObject);
        document.forms.new.addEventListener("submit", this.submit.bind(this));
        document.forms.new.addEventListener("input", function (event) {
            if (this.firstFieldValid && this.secondFieldValid) {
                Validation.activateButton(this.commitButton);
            } else {
                Validation.disableButton(this.commitButton);
            }
        }.bind(this));
        this.firstField.addEventListener("input", function (event) {
            this.firstFieldValid = Validation.checkInput(this.firstField);
        }.bind(this));
        this.secondField.addEventListener("input", function (event) {
            this.secondFieldValid = Validation.checkInput(this.secondField, "link");
        }.bind(this));
    }
    submit(event) {
        event.preventDefault();

        const form = document.forms.new;
        const name = form.elements.name;
        const link = form.elements.link;

        if (this.firstFieldValid && this.secondFieldValid) {
            api.submitCard(this, name, link)
                .then(data => {
                    this.commitButton.textContent = "Сохранить";
                    cardsContainer.addCard(data);
                    this.close();
                })
        }
    }
    open() {
        this.popupObject.classList.add("popup_is-opened");
        this.firstField.value = "";
        this.secondField.value = "";
        Validation.checkInput(this.secondField, "link");
    }
}