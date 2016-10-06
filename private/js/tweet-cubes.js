class TweetCube {
    constructor() {
        this.count = 0;
        this.clearCut = false;
        this.lollypop = ["#FF7F7F", "#FFFF7F", "#3FFF7F"];
        this.scheme = ["#B6A39E", "#D0D1AC", "#DCDDC7"];
        this.theme = this.lollypop;
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

        var lCol = 8,
            lSet = (12 - lCol) / 2,
            sCol = 12,
            sSet = (12 - sCol) / 2;

        
        $("#main").append(`<div class="text-center col-xs-${sCol} col-sm-${sCol} col-md-${lCol} col-lg-${lCol} col-md-offset-${lSet} col-sm-offset-${sSet} col-xs-offset-${sSet} sentiment_box"><div class="cube-wrap mainCube"><div id="${ID}" class="cube"><div class="cube-front"><blockquote class="twitter-tweet"><p id="content">${phrase}</p><p id="screen-name">"${screenName}"</p> </blockquote> </div><div class="cube-bottom" style="background-color: ${this.getColor(normalised)};"><h3>${["The Worst!", "Awful!", "Bad!", "Average", "Okay", "Good", "Perfect"][Math.round((1 - normalised) * 6) > 6 ? 6 : Math.round((1 - normalised) * 6) <= 0 ? 0 : Math.round((1 - normalised) * 6)]}</h3></div></div> </div></div>`);
        
        $('#' + ID).unbind();
        
        if(this.clearCut) {
        $('#' + ID).addClass('step1').on('click', () => {
            var old = step
            step = step > 1 ? 1 : 2;
            $('#' + ID).addClass('step' + step).removeClass('step' + old);
        }).unbind();

            $('#' + ID).hover(() => {
            step = 2;
            $('#' + ID).addClass('step2').removeClass('step1');
        }, () => {
            step = 1;
            $('#' + ID).addClass('step1').removeClass('step2');
        }); 
    }
        else
        $('#' + ID).addClass('step1').on('click', () => {
            var old = step
            step = step > 1 ? 1 : 2;
            $('#' + ID).addClass('step' + step).removeClass('step' + old);
        });

    }

    removeAll() {
        $(".sentiment_box").remove();
    }

    getColor(v) {
        return this.clearCut ? this.theme[1 - v < 0.33 ? 0 : 1 - v < 0.667 ? 1 : 2] : `hsl(${(( 1 - v) * 120).toString(10)},100%,70%)`;
    }
}