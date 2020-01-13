import Popup from './Popup';
import {Validation} from './Validation';
import {headerName, headerAbout} from '../script';
import {api} from '../script';


export default class PopupEdit extends Popup {
    constructor(popupObject) {
        super(popupObject);
        document.forms.edit.addEventListener("submit", this.submit.bind(this));
        document.forms.edit.addEventListener("input", function (event) {
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
            this.secondFieldValid = Validation.checkInput(this.secondField);
        }.bind(this));
    }
    submit(event) {
        event.preventDefault();

        const form = document.forms.edit;
        const name = form.elements.name;
        const about = form.elements.about;

        if (this.firstFieldValid && this.secondFieldValid) {
            api.editInfo(this, name, about)
                .then(data => {
                    if (data) {
                        headerName.textContent = data.name;
                        headerAbout.textContent = data.about;
                    }
                    this.commitButton.textContent = "Сохранить";
                    this.close();
                })
        }
    }
    open() {
        this.popupObject.classList.add("popup_is-opened");
        this.firstField.value = headerName.textContent;
        this.secondField.value = headerAbout.textContent;
        this.firstFieldValid = Validation.checkInput(this.firstField);
        this.secondFieldValid = Validation.checkInput(this.secondField);
    }
}