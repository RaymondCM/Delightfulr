let twitterFeed = new AjaxCall("/getTweets/");
let tweets = new TweetCube();

$(document).ready(() => {
    $("#input").submit(function (event) {
        $("#main").removeClass("vertical-center-row");
        tweets.removeAll();
        twitterFeed.getStatus(document.getElementById("search").value, parseResponse);
        return false;
    });
});

function parseResponse(response) {
    if (typeof response == 'string') {
        console.log("No Response Recieved: ", response)
    } else if (typeof response == 'object') {
        console.log(response);
        response.tweets.forEach(item => tweets.createCube(item.tweet, `— ${response.name} (@${response.screen_name})`));
    }
}