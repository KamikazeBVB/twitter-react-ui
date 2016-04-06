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

function constructUserToTwittMapping(userNames, twitt, index) {
  const newObject = {};
  newObject[userNames[0]] = extractRelevantData(twitt[0][index]);
  newObject[userNames[1]] = extractRelevantData(twitt[1][index]);
  newObject[userNames[2]] = extractRelevantData(twitt[2][index]);
  return newObject;
}

export function getTwitts(requestConfig) {
  if (!Array.isArray(requestConfig.twitterUserNames)) {
    throw new Error('You must specify an array of user names');
  }

  const twitterCalls = requestConfig.twitterUserNames.map((userName) => {
    return callProxy(prepareUrl(userName, requestConfig));
  });

  return Promise.all(twitterCalls)
    .then(twitts => {
      let longestArray = twitts[0].length > twitts[1].length ? twitts[0].length : twitts[1].length;
      longestArray = longestArray > twitts[2].length ? longestArray : twitts[2].length;

      const processedTwitts = [];

      for (let index = 0; index < longestArray; index++) {
        processedTwitts.push(
          constructUserToTwittMapping(requestConfig.twitterUserNames, twitts, index)
        );
      }

      return processedTwitts;
    })
    .catch(err => { console.log(err); });
}
