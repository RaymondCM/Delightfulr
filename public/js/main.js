'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AjaxCall = function () {
    function AjaxCall(path, name) {
        _classCallCheck(this, AjaxCall);

        this.post = path;
        this.name = name;
        this.data = "";
    }

    _createClass(AjaxCall, [{
        key: 'getStatus',
        value: function getStatus(phrase) {
            var _this = this;

            $.ajax({
                type: 'GET',
                contentType: 'application/json',
                url: '' + this.post + AjaxCall.removeAllSpecialCharacters(phrase),
                success: function success(data) {
                    return _this.onMessage(data);
                }
            });
        }
    }, {
        key: 'onMessage',
        value: function onMessage(data) {
            this.data = data;
            console.log(this.name + '=' + JSON.stringify(data));
        }
    }], [{
        key: 'removeAllSpecialCharacters',
        value: function removeAllSpecialCharacters(phrase) {
            return phrase;
        }
    }]);

    return AjaxCall;
}();
"use strict";

var sentiment = new AjaxCall("/getSentiment/");

sentiment.getStatus("a");