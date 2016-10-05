var sentiment = require('sentiment');

//Callback functions
var error = function (err, response, body) {
    console.log('ERROR [%s]', err);
};
var success = function (data) {
    data = JSON.parse(data);
    var statuses = [];
    for (let i = 0; i < data.length; ++i)
        statuses.push(data[i].text);
    console.log('Data [%s]', statuses);
};

var Twitter = require('twitter-node-client').Twitter;

//Get this data from your twitter apps dashboard
var config = {
    "consumerKey": "Km7a5nyO15ZKOaw0c0kuImHDg",
    "consumerSecret": "M041Y92HaQqvOxogutRsyRf6UlnZSbyHZUcSJSGVsAdfwlDfwa",
    "accessToken": "452467731-FasZkSfexiGTdXsj7QrcJQm2NHFoLXYiyHfr3fsl",
    "accessTokenSecret": "MoGyukFzPhr1gOgvmzkjMwGXIyuhAUiT9UOeN8kcqH36Z"
}

var twitter = new Twitter(config);

module.exports = (app, pir, gestures) => {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + '/index.html'));
    });

    //Enable CORS for Same Origin Requests
    app.all('*', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });

    app.get('/getSentiment/:phrase', (req, res) => {
        if (!req.body) return res.sendStatus(400)
        res.send({
            "value": sentiment(req.params.phrase)
        });
    });

    app.get('/getTweets/:user', (req, res) => {
        if (!req.body) return res.sendStatus(400)
        var user = req.params.user;

        twitter.getCustomApiCall('/users/lookup.json', {
            screen_name: user
        }, error, () => {
            twitter.getUserTimeline({
                screen_name: user,
                count: '3'
            }, error, (data) => {
                //console.log("sending", data);
                res.send({
                    "value": data
                });
            });
        });
    });
}