import React from 'react';
import Tweet from './../../components/Tweet/Tweet';
import {getTweets} from './../../services/TweeterClient';

export default class Tweets extends React.Component {

  componentWillMount() {
    getTweets()
      .then(result => {
        this.setState({tweets: result});
      });
  }

  render() {
    const style = require('./Tweets.scss');

    const listItem = (tweet, index) => {
      return (
        <div key={index} className={style.TweetsContainer_row}>
          <div className={style.TweetsContainer_column}>
            {tweet.appDirect ? <Tweet tweetContent={tweet.appDirect}/> : <span/>}
          </div>
          <div className={style.TweetsContainer_column}>
            {tweet.techCrunch ? <Tweet tweetContent={tweet.techCrunch}/> : <span/>}
          </div>
          <div className={style.TweetsContainer_column}>
            {tweet.laughingSquid ? <Tweet tweetContent={tweet.laughingSquid}/> : <span/>}
          </div>
        </div>
      );
    };

    return (
      <div className={style.MainContainer}>
        <div className={style.TitleContainer}>
          <h1 className={style.TitleContainer_title}>Recent tweets</h1>
        </div>
        <div className={style.TweetsContainer}>
          {this.state.tweets.map(listItem)}
        </div>
      </div>
    );
  }
}
