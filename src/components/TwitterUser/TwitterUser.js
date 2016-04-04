import React, {PropTypes} from 'react';

export default class TwitterUser extends React.Component {
  static propTypes = {
    twitterUserName: PropTypes.string.isRequired
  }

  render() {
    const style = require('./TwitterUser.scss');

    return (
      <div className={style.TwitterUser}>
        @{this.props.twitterUserName}
      </div>
    );
  }
}
