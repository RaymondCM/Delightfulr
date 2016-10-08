/* Based on the NPM package Sentiment https://www.npmjs.com/package/sentiment */
/* Using AFINN Database and Emoji Sentiment Ranking from http://kt.ijs.si/data/Emoji_sentiment_ranking/index.html */

var afinn = require('./afinn.json');
var emojiRegex = require('emoji-regex');

function tokenise(input) {
    let str = input.replace(/[^a-zA-Z- ]+/g, '').toLowerCase().split(' ').filter((str) => /\S/.test(str));
    let emojis = [...new Set(input.match(emojiRegex()))];
    return emojis ? str.concat(emojis) : str;
};

module.exports = function (phrase = '') {
    var tokens = tokenise(phrase),
        score = 0,
        length = tokens.length;

    while (length--) {
        var obj = afinn[tokens[length]];
        score += !obj || (tokens[length - 1] && tokens[length - 1] == 'not') ? 0 : obj;
    }

    return score / tokens.length;
};