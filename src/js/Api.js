export default class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    }
    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, this)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .catch(err => console.log(err));
    }
    updatePersonalInfo() {
        return fetch(`${this.baseUrl}/users/me`, this)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .catch(err => console.log(err));
    }
    updateAvatar(link) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
                method: "PATCH",
                headers: this.headers,
                body: JSON.stringify({
                    avatar: link
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .catch(err => console.log(err));
    }
    submitCard(popupNew, name, link) {
        return fetch(`${this.baseUrl}/cards`, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({
                    name: name.value,
                    link: link.value
                })
            }).then(res => {
                popupNew.commitButton.textContent = "Загрузка...";
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .catch(err => console.log(err))
    }
    editInfo(popupEdit, name, about) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                name: name.value,
                about: about.value
            })
        }).then(res => {
            popupEdit.commitButton.textContent = "Загрузка...";
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(res.status);
        }).catch(err => console.log(err));
    }
    deleteCard(card) {
        fetch(`${this.baseUrl}/cards/${card.id}`, {
            method: "DELETE",
            headers: this.headers
        });
    }
    likeCard(card) {
        return fetch(`${this.baseUrl}/cards/like/${card.id}`, {
                method: "PUT",
                headers: this.headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .catch(err => console.log(err));
    }
    dislikeCard(card) {
        return fetch(`${this.baseUrl}/cards/like/${card.id}`, {
                method: "DELETE",
                headers: this.headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(res.status);
            })
            .catch(err => console.log(err));
    }
}