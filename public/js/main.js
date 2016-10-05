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
        value: function getStatus(phrase, callback) {
            var _this = this;

            $.ajax({
                type: 'GET',
                contentType: 'application/json',
                url: '' + this.post + AjaxCall.removeAllSpecialCharacters(phrase),
                success: function success(data) {
                    return _this.onMessage(data, callback);
                }
            });
        }
    }, {
        key: 'onMessage',
        value: function onMessage(data, callback) {
            this.data = data;
            //console.log(`${this.name}=${JSON.stringify(data)}`);
            callback(data);
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
var tweets = new AjaxCall("/getTweets/");

var currentUser = {};

$(document).ready(function () {
    //sentiment.getStatus("hello how are you beautiful", () => console.log("hello"));
    //tweets.getStatus("_tabbby", (data) => console.log(rawStreamToTweets(data.value)));


    $("#input").submit(function (event) {
        console.log(document.getElementById("search").value);
        $("#main").removeClass("vertical-center-row");
        $(".sentiment_box").remove();
        tweets.getStatus(document.getElementById("search").value, function (data) {
            return rawStreamToTweets(data.value);
        });
        return false;
    });
});
var count = 0;

function createCube() {
    var phrase = arguments.length <= 0 || arguments[0] === undefined ? "Tweets and links" : arguments[0];
    var screenName = arguments.length <= 1 || arguments[1] === undefined ? "— Screen Name (@ID)" : arguments[1];
    var sentiment = arguments[2];

    var ID = "cube" + count++;
    var step = 1;

    $("#main").append("<div class=\"text-center col-xs-10 col-sm-10 col-md-6 col-lg-6 col-md-offset-3 col-sm-offset-1 col-xs-offset-1 sentiment_box\"><div class=\"cube-wrap example4\"><div id=\"" + ID + "\" class=\"cube\"><div class=\"cube-front\"><blockquote class=\"twitter-tweet\"><p id=\"content\">" + phrase + "</p><p id=\"screen-name\">\"" + screenName + "\"</p> </blockquote> </div><div class=\"cube-bottom\"></div></div> </div></div>");
    $('#' + ID).addClass('step1').on('click', function () {
        var old = step;
        step = step > 1 ? 1 : 2;
        $('#' + ID).addClass('step' + step).removeClass('step' + old);
    });

    //document.getElementById("main").appendChild(container);
}

function rawStreamToTweets(data) {
    var statuses = [];
    var user = "",
        screenName = "";

    if (data) {
        data = JSON.parse(data);
        if (data.length > 0) {
            screenName = data[0].user.screen_name;
            user = data[0].user.name;
        }

        for (var i = 0; i < data.length; ++i) {
            statuses.push(data[i].text);
        }
    }
    var final = [];
    statuses.forEach(function (item, index, array) {
        return sentiment.getStatus(item.replace(/[^a-zA-Z0-9+]/g, " "), function (data) {
            final.push({
                tweet: item,
                sentiment: data.value
            });
            createCube(item, "— " + user + " (@" + screenName + ")");
        });
    });

    console.log(final);
    return final;
}