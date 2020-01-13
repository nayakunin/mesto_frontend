export default class errorListClass {
    constructor() {
        this.emptyField = "Это поле обязательное";
        this.wrongLength = "Должно быть от 2 до 30 символов";
        this.wrongURL = "Здесь должны быть ссылка";
    }
};

export const errorList = new errorListClass();