class AjaxCall {
    constructor(path, name) {
        this.post = path;
        this.name = name;
        this.data = "";
    }

    getStatus(phrase) {
        $.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: `${this.post}${AjaxCall.removeAllSpecialCharacters(phrase)}`,
            success: (data) => this.onMessage(data)
        });
    }

    static removeAllSpecialCharacters(phrase) {
        return phrase;
    }

    onMessage(data) {
        this.data = data;
        console.log(`${this.name}=${JSON.stringify(data)}`);
    }
}