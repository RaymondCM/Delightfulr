let sentiment = new AjaxCall("/getSentiment/");
let tweets = new AjaxCall("/getTweets/");

let currentUser = {};

$(document).ready(() => {
    //sentiment.getStatus("hello how are you beautiful", () => console.log("hello"));
    //tweets.getStatus("_tabbby", (data) => console.log(rawStreamToTweets(data.value)));



    $("#input").submit(function (event) {
        console.log(document.getElementById("search").value);
        $("#main").removeClass("vertical-center-row");
        $(".sentiment_box").remove();
        tweets.getStatus(document.getElementById("search").value, (data) => rawStreamToTweets(data.value));
        return false;
    });

});
var count = 0;

function createCube(phrase = "Tweets and links", screenName = "— Screen Name (@ID)", sentiment) {
    var ID = "cube" + count++;
    var step = 1;

    $("#main").append(`<div class="text-center col-xs-10 col-sm-10 col-md-6 col-lg-6 col-md-offset-3 col-sm-offset-1 col-xs-offset-1 sentiment_box"><div class="cube-wrap example4"><div id="${ID}" class="cube"><div class="cube-front"><blockquote class="twitter-tweet"><p id="content">${phrase}</p><p id="screen-name">"${screenName}"</p> </blockquote> </div><div class="cube-bottom"></div></div> </div></div>`);
    $('#' + ID).addClass('step1').on('click', () => {
        var old = step
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

        for (let i = 0; i < data.length; ++i)
            statuses.push(data[i].text);
    }
    var final = [];
    statuses.forEach((item, index, array) => sentiment.getStatus(item.replace(/[^a-zA-Z0-9+]/g, " "), (data) => {
        final.push({
            tweet: item,
            sentiment: data.value
        });
        createCube(item, `— ${user} (@${screenName})`);
    }));


    console.log(final);
    return final;
}