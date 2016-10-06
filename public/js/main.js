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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TweetCube = function () {
    function TweetCube() {
        _classCallCheck(this, TweetCube);

        this.count = 0;
        this.clearCut = false;
        this.lollypop = ["#FF7F7F", "#FFFF7F", "#3FFF7F"];
        this.scheme = ["#B6A39E", "#D0D1AC", "#DCDDC7"];
        this.theme = this.lollypop;
    }

    _createClass(TweetCube, [{
        key: "createCube",
        value: function createCube() {
            var phrase = arguments.length <= 0 || arguments[0] === undefined ? "Tweets and links" : arguments[0];
            var screenName = arguments.length <= 1 || arguments[1] === undefined ? "— Screen Name (@ID)" : arguments[1];
            var sentiment = arguments[2];

            var ID = "cube" + this.count++;
            var step = 1;
            var max = 0.5;
            var min = -0.5;
            var comparative = sentiment.comparative;

            if (comparative > max) comparative = max;else if (comparative < min) comparative = min;

            var normalised = 1 - (comparative - min) / (max - min);

            var lCol = 8,
                lSet = (12 - lCol) / 2,
                sCol = 10,
                sSet = (12 - sCol) / 2;

            $("#main").append("<div class=\"text-center col-xs-" + sCol + " col-sm-" + sCol + " col-md-" + lCol + " col-lg-" + lCol + " col-md-offset-" + lSet + " col-sm-offset-" + sSet + " col-xs-offset-" + sSet + " sentiment_box\"><div class=\"cube-wrap mainCube\"><div id=\"" + ID + "\" class=\"cube\"><div class=\"cube-front\"><blockquote class=\"twitter-tweet\"><p id=\"content\">" + phrase + "</p><p id=\"screen-name\">\"" + screenName + "\"</p> </blockquote> </div><div class=\"cube-bottom\" style=\"background-color: " + this.getColor(normalised) + ";\"><h3>" + ["The Worst!", "Awful!", "Bad!", "Average", "Okay", "Good", "Perfect"][Math.round((1 - normalised) * 6) > 6 ? 6 : Math.round((1 - normalised) * 6) <= 0 ? 0 : Math.round((1 - normalised) * 6)] + "</h3></div></div> </div></div>");

            $('#' + ID).addClass('step1').on('click', function () {
                var old = step;
                step = step > 1 ? 1 : 2;
                $('#' + ID).addClass('step' + step).removeClass('step' + old);
            });

            if (this.clearCut) $('#' + ID).hover(function () {
                step = 2;
                $('#' + ID).addClass('step2').removeClass('step1');
            }, function () {
                step = 1;
                $('#' + ID).addClass('step1').removeClass('step2');
            });
        }
    }, {
        key: "removeAll",
        value: function removeAll() {
            $(".sentiment_box").remove();
        }
    }, {
        key: "getColor",
        value: function getColor(v) {
            console.log(1 - v);
            return this.clearCut ? this.theme[1 - v < 0.33 ? 0 : 1 - v < 0.667 ? 1 : 2] : "hsl(" + ((1 - v) * 120).toString(10) + ",100%,70%)";
        }
    }]);

    return TweetCube;
}();
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var twitterFeed = new AjaxCall("/getTweets/");
var tweetCube = new TweetCube();

$(document).ready(function () {
    $("#input").submit(function (event) {
        tweetCube.removeAll();
        twitterFeed.getStatus(document.getElementById("search").value, parseResponse);
        return false;
    });

    $("#colourscale").on("click", function (e) {
        if (tweetCube.clearCut) {
            tweetCube.clearCut = false;
            $("#colourscale").addClass('range');
            $("#worst").css('background-color', "");
            $("#average").css('background-color', "");
            $("#best").css('background-color', "");
        } else {
            tweetCube.clearCut = true;
            $("#colourscale").removeClass('range');
            $("#worst").css('background-color', tweetCube.theme[0]);
            $("#average").css('background-color', tweetCube.theme[1]);
            $("#best").css('background-color', tweetCube.theme[2]);
        }
    });
});

function parseResponse(response) {
    if (typeof response == 'string') {
        console.log("No Response Recieved: ", response);
    } else if ((typeof response === "undefined" ? "undefined" : _typeof(response)) == 'object') {
        console.log(response);
        response.tweets.forEach(function (item) {
            return tweetCube.createCube(item.tweet, "— " + response.name + " (@" + response.screen_name + ")", item.sentiment);
        });
    }
}