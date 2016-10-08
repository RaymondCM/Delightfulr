var sentiment = require('./sentiment');
var Twitter = require('twitter-node-client').Twitter;
var cache = require('memory-cache');

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

    app.get('/getTweets/:user', (req, res) => {
        if (!req.body) return res.sendStatus(400)

        if (isValidTwitterScreenName(req.params.user)) {
            var options = {
                screen_name: req.params.user
            };

            var noUser = function (err, response, body) {
                res.send("User doesn't exist.");
                console.log('ERROR [%s]', err);
            };

            var error = function (err, response, body) {
                res.send("Couldn't get that users timeline.");
                console.log('ERROR [%s]', err);
            };

            var cObj = cache.get(req.params.user);
            if (cObj == null) {
                twitter.getCustomApiCall('/users/lookup.json', options, noUser, () => {
                    twitter.getUserTimeline({
                        screen_name: req.params.user,
                        exclude_replies: true,
                        include_rts: false,
                        count: '15'
                    }, error, response => {
                        try {
                            var tweets = [];
                            var user = "";
                            var screenName = "";

                            response = JSON.parse(response);

                            if (response.length > 0) {
                                screenName = response[0].user.screen_name;
                                user = response[0].user.name;
                            }

                            for (let i = 0; i < response.length; ++i) {
                                tweets.push({
                                    tweet: response[i].text,
                                    sentiment: sentiment(response[i].text)
                                });
                            }

                            if (tweets.length > 0) {
                                var tObj = {
                                    name: user,
                                    screen_name: screenName,
                                    tweets: tweets
                                };

                                console.log(`Caching User "${req.params.user}"`);
                                cache.put(req.params.user, tObj, 5 * 60 * 1000, function (key, value) {
                                    console.log(`Deleted User "${key}"`);
                                });

                                res.send(tObj);
                            } else {
                                res.send("No tweets available for this user.")
                            }

                        } catch (error) {
                            console.log(`Error: ${error}`);
                            res.send(`Error: ${error}`);
                        }
                    });
                });
            } else {
                res.send(cObj);
            }
        } else {
            res.send("Invalid Screen Name");
        }
    });
}

function isValidTwitterScreenName(name) {
    return !new RegExp("^@?(\w){1,15}$").test(name);
}