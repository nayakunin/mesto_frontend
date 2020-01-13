import {Validation} from './Validation';
import {api} from '../script';

export default class PopupAvatar {
    constructor(popupObject) {
        this.popupObject = popupObject;
        this.input = popupObject.querySelector(".popup__input");
        this.inputValid = false;
        this.commitButton = popupObject.querySelector(".popup__button");
        document.forms.avatar.addEventListener("submit", this.submit.bind(this));
        document.forms.avatar.addEventListener("input", function (event) {
            this.inputValid ? Validation.activateButton(this.commitButton) : Validation.disableButton(this.commitButton);
        }.bind(this));
        this.input.addEventListener("input", function (event) {
            this.inputValid = Validation.checkInput(this.input, "link");
        }.bind(this));
        this.popupObject.addEventListener("click", function (event) {
            if (event.target.classList.contains("popup__close")) {
                this.close();
            }
        }.bind(this));
    }
    submit(event) {
        event.preventDefault();

        const form = document.forms.avatar;
        const link = form.elements.link;

        if (this.inputValid) {
            api.updateAvatar(link.value)
                .then(res => {
                    headerAvatar.style.backgroundImage = `url(${res.avatar})`;
                    this.close();
                })
        }
    }
    open() {
        this.popupObject.classList.add("popup_is-opened");
        this.input.value = "";
        this.inputValid = Validation.checkInput(this.input, "link");
    }
    close() {
        this.popupObject.classList.remove("popup_is-opened");
        this.inputValid = false;
        Validation.disableButton(this.commitButton);
    }
}