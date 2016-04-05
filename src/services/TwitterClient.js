import superagent from 'superagent';
import config from './../config.js';

function buildTwittUrl(tweet) {
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

function extractRelevantData(rawTwitt) {
  return {
    createdAt: rawTwitt.created_at,
    url: buildTwittUrl(rawTwitt),
    userMentions: rawTwitt.entities.user_mentions
                    .map(item => {return {screenName: item.screen_name};}),
    content: rawTwitt.text,
    screenName: rawTwitt.user.screen_name
  };
}

function constructQueryStringParameter(name, value) {
  return `&${name}=${value}`;
}

function prepareUrl(userName, requestConfig) {
  if (!userName) throw new Error('Invalid user name');

  let url = `${config.twitterBaseProxyUrl}=${userName}`;

  if (requestConfig.twittsPerColumnCount) {
    url = url + constructQueryStringParameter('count', requestConfig.twittsPerColumnCount);
  }

  return url;
}

export function getTwitts(requestConfig) {
  if (!Array.isArray(requestConfig.twitterUserNames)) {
    throw new Error('You must specify an array of user names');
  }

  const twitterCalls = requestConfig.twitterUserNames.map((userName) => {
    return callProxy(prepareUrl(userName, requestConfig));
  });

  return Promise.all(twitterCalls)
    .then(tweets => {
      let longestArray = tweets[0].length > tweets[1].length ? tweets[0].length : tweets[1].length;
      longestArray = longestArray > tweets[2].length ? longestArray : tweets[2].length;

      const processedTwitts = [];

      for (let index = 0; index < longestArray; index++) {
        processedTwitts.push({
          appDirect: extractRelevantData(tweets[0][index]),
          techCrunch: extractRelevantData(tweets[1][index]),
          laughingSquid: extractRelevantData(tweets[2][index])
        });
      }

      return processedTwitts;
    })
    .catch(err => { console.log(err); });
}
