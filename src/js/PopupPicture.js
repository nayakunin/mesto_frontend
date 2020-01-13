export default class PopupPictureClass {
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

export const popupPicture = new PopupPictureClass(document.querySelector(".popup-picture"));