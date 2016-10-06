class AjaxCall {
    constructor(path, name) {
        this.post = path;
        this.name = name;
        this.data = "";
    }

    getStatus(phrase, callback) {
        $.ajax({
            type: 'GET',
            contentType: 'application/json',
            url: `${this.post}${AjaxCall.removeAllSpecialCharacters(phrase)}`,
            success: (data) => this.onMessage(data, callback)
        });
    }

    static removeAllSpecialCharacters(phrase) {
        return phrase;
    }

    onMessage(data, callback) {
        this.data = data;
        callback(data);
    }
}