var sentiment = require('sentiment');

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
}