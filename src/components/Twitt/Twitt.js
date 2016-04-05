import React, {PropTypes} from 'react';

export default class Twitt extends React.Component {
  static propTypes = {
    twittContent: PropTypes.object.isRequired,
    theme: PropTypes.string
  }

  render() {
    const styleRefernce = this.props.theme === 'Black' ? '_blackTheme' : '';
    const style = require(`./Twitt${styleRefernce}.scss`);
    console.log('aaa', styleRefernce);
    const twitt = this.props.twittContent;

    const renderMentions = (item, index) => {
      return (
        <span key={index} className={style.TwittDetails_twitterRetwitts}>{item.screenName};</span>
      );
    };

    return (
      <div className={style.MainContainer}>
        <div className={style.MainContainer_row}>
          <span className={style.CreatedAt}> {twitt.createdAt.split('+')[0]} by {twitt.screenName} </span>
        </div>
        <div className={style.MainContainer_row}>
          <span className={style.TwittText}>
            {twitt.content}
          </span>
        </div>
        <div className={style.MainContainer_row}>
          <div className={style.TwittDetails}>
            <a className={style.TwittDetails_twitterLink} href={twitt.url}> View twitt</a>
            {twitt.userMentions.length > 0 ?
            <div className={style.TwittDetails_mentionContainer}>
              <span> User mentions: </span>
              {twitt.userMentions.map(renderMentions)}
            </div> : '' }
          </div>
        </div>
      </div>
    );
  }
}
