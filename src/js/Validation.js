import {errorList} from './errorList';

export default class ValidationClass {
    constructor () {}
    disableButton (commitButton) {
        commitButton.classList.remove("popup__button_active");
        commitButton.disabled = true;
    };
    
    activateButton (commitButton) {
        commitButton.classList.add("popup__button_active");
        commitButton.disabled = false;
    };
    
    isValidName (element) {
        return !this.isEmpty(element) && !this.isWrongLength(element);
    }
    
    isEmpty (element) {
        return element.length === 0;
    };
    
    isWrongLength (element) {
        return element.length < 2 || element.length > 30;
    };
    
    nameValidation (answer) {
        if (this.isEmpty(answer)) {
            return errorList.emptyField;
        }
        if (this.isWrongLength(answer)) {
            return errorList.wrongLength;
        }
        return true;
    };
    
    linkValidation (answer) {
        if (this.isEmpty(answer)) {
            return errorList.emptyField;
        }
        return true;
    };
    
    checkInput (eventTarget, mode = "name") {
        const check =
            mode === "link" ?
            this.linkValidation(eventTarget.value) :
            this.nameValidation(eventTarget.value);
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
}

export const Validation = new ValidationClass();