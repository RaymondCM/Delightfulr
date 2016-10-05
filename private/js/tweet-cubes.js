class TweetCube {
    constructor() {
        this.count = 0;
    }

    createCube(phrase = "Tweets and links", screenName = "— Screen Name (@ID)", sentiment) {
        var ID = "cube" + this.count++;
        var step = 1;

        $("#main").append(`<div class="text-center col-xs-10 col-sm-10 col-md-6 col-lg-6 col-md-offset-3 col-sm-offset-1 col-xs-offset-1 sentiment_box"><div class="cube-wrap example4"><div id="${ID}" class="cube"><div class="cube-front"><blockquote class="twitter-tweet"><p id="content">${phrase}</p><p id="screen-name">"${screenName}"</p> </blockquote> </div><div class="cube-bottom"></div></div> </div></div>`);
        $('#' + ID).addClass('step1').on('click', () => {
            var old = step
            step = step > 1 ? 1 : 2;
            $('#' + ID).addClass('step' + step).removeClass('step' + old);
        });
    }

    removeAll() {
        $(".sentiment_box").remove();
    }
}