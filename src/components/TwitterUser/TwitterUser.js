import React, {PropTypes} from 'react';

export default class TwitterUser extends React.Component {
  static propTypes = {
    twitterUserName: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onClick: PropTypes.func
  }

  handleClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.twitterUserName);
    }
  }

  render() {
    const style = require('./TwitterUser.scss');

    const mainDivStyle = this.props.isSelected ?
                            style.TwitterUser_selected : style.TwitterUser;
    return (
      <div className={mainDivStyle}>
        <span onClick={this.handleClick.bind(this)}>
          @{this.props.twitterUserName}
        </span>
      </div>
    );
  }
}

