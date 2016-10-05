class TweetCube {
    constructor() {
        this.count = 0;
    }

    createCube(phrase = "Tweets and links", screenName = "— Screen Name (@ID)", sentiment) {
        var ID = "cube" + this.count++;
        var step = 1;
        var max = 0.5;
        var min = -0.5;
        var comparative = sentiment.comparative;

        if (comparative > max)
            comparative = max;
        else if (comparative < min)
            comparative = min;

        var normalised = 1 - ((comparative - min) / (max - min));
        console.log(comparative, normalised, TweetCube.getColor(normalised));

        var lCol = 8,
            lSet = (12 - lCol) / 2,
            sCol = 10,
            sSet = (12 - sCol) / 2;

        $("#main").append(`<div class="text-center col-xs-${sCol} col-sm-${sCol} col-md-${lCol} col-lg-${lCol} col-md-offset-${lSet} col-sm-offset-${sSet} col-xs-offset-${sSet} sentiment_box"><div class="cube-wrap example4"><div id="${ID}" class="cube"><div class="cube-front"><blockquote class="twitter-tweet"><p id="content">${phrase}</p><p id="screen-name">"${screenName}"</p> </blockquote> </div><div class="cube-bottom" style="background-color: ${TweetCube.getColor(normalised)};"></div></div> </div></div>`);
        $('#' + ID).addClass('step1').on('click', () => {
            var old = step
            step = step > 1 ? 1 : 2;
            $('#' + ID).addClass('step' + step).removeClass('step' + old);
        });
    }

    removeAll() {
        $(".sentiment_box").remove();
    }

    static getColor(value, useFixed = false) {
        //value from 0 to 1
        if (useFixed)
            return ["#B6A39E", "#D0D1AC", "#DCDDC7"][value < 0.33 ? 0 : value < 0.667 ? 1 : 2];

        return `hsl(${((1 - value) * 120).toString(10)},50%,65%)`;
    }
}