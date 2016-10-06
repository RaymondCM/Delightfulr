let twitterFeed = new AjaxCall("/getTweets/");
let tweetCube = new TweetCube();

$(document).ready(() => {
    $("#input").submit((event) => {
        tweetCube.removeAll();
        twitterFeed.getStatus(document.getElementById("search").value, parseResponse);
        return false;
    });

    $("#colourscale").on("click", (e) => {
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
        console.log("No Response Recieved: ", response)
    } else if (typeof response == 'object') {
        console.log(response);
        response.tweets.forEach(item => tweetCube.createCube(item.tweet, `— ${response.name} (@${response.screen_name})`, item.sentiment));
    }
}