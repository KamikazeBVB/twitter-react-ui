import React, {PropTypes} from 'react';

export default class Tweet extends React.Component {
  static propTypes = {
    tweetContent: PropTypes.object.isRequired
  }

  render() {
    const style = require('./Tweet.scss');
    const tweet = this.props.tweetContent;

    const renderMentions = (item, index) => {
      return (
        <span key={index} className={style.TweetDetails_tweeterRetweets}>{item.screenName};</span>
      );
    };

    return (
      <div className={style.MainContainer}>
        <div className={style.MainContainer_row}>
          <span className={style.CreatedAt}> {tweet.createdAt.split('+')[0]} by {tweet.screenName} </span>
        </div>
        <div className={style.MainContainer_row}>
          <span className={style.TweetText}>
            {tweet.content}
          </span>
        </div>
        <div className={style.MainContainer_row}>
          <div className={style.TweetDetails}>
            <a className={style.TweetDetails_tweeterLink} href={tweet.url}> View tweet</a>
            {tweet.userMentions.length > 0 ?
            <div className={style.TweetDetails_mentionContainer}>
              <span> User mentions: </span>
              {tweet.userMentions.map(renderMentions)}
            </div> : '' }
          </div>
        </div>
      </div>
    );
  }
}
