import superagent from 'superagent';
import config from './../config.js';

const appDirectTweets = callProxy(`${config.tweeterBaseProxyUrl}=appdirect`);
const techChrunchTweets = callProxy(`${config.tweeterBaseProxyUrl}=techcrunch`);
const laughingSquidTweets = callProxy(`${config.tweeterBaseProxyUrl}=laughingsquid`);

function buildTweetUrl(tweet) {
  return `http://twitter.com/statuses/${tweet.id_str}`;
}

function callProxy(url) {
  return new Promise((resolve, reject) => {
    const request = superagent.get(url);

    request.end((err, {body}) => {
      if (err) {
        return reject(body || err);
      }

      resolve(body);
    });
  });
}

function extractRelevantData(rawTweet) {
  return {
    createdAt: rawTweet.created_at,
    url: buildTweetUrl(rawTweet),
    userMentions: rawTweet.entities.user_mentions
                    .map(item => {return {screenName: item.screen_name};}),
    content: rawTweet.text,
    screenName: rawTweet.user.screen_name
  };
}

export function getTweets() {
  return Promise.all([appDirectTweets, techChrunchTweets, laughingSquidTweets])
    .then(tweets => {
      let longestArray = tweets[0].length > tweets[1].length ? tweets[0].length : tweets[1].length;
      longestArray = longestArray > tweets[2].length ? longestArray : tweets[2].length;

      const processedTweets = [];

      for (let index = 0; index < longestArray; index++) {
        processedTweets.push({
          appDirect: extractRelevantData(tweets[0][index]),
          techCrunch: extractRelevantData(tweets[1][index]),
          laughingSquid: extractRelevantData(tweets[2][index])
        });
      }

      return processedTweets;
    })
    .catch(err => { console.log(err); });
}
