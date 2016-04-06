import React, {PropTypes} from 'react';
import TwitterUser from './../TwitterUser/TwitterUser';

export default class ColumnOrderPicker extends React.Component {
  static propTypes = {
    twitterUserNames: PropTypes.array.isRequired,
    onColumnOrderChanged: PropTypes.func
  }

  componentWillMount() {
    const users = this.props.twitterUserNames.map((user, index) => {
      return {
        userName: user,
        isSelected: false,
        index: index
      };
    });

    this.setState(
        {users}
      );
  }

  swapUsers(users, selectedUser, otherSelectedUser) {
    const auxIndex = selectedUser.index;

    selectedUser.index = otherSelectedUser.index;
    otherSelectedUser.index = auxIndex;

    return users.sort((first, second) => {
      if (first.index > second.index) return 1;
      if (first.index < second.index) return -1;
      return 0;
    });
  }

  handleColumnOrderChanged() {
    if (this.props.onColumnOrderChanged) {
      const userNames = this.state.users.map(user => {
        return user.userName;
      });

      this.props.onColumnOrderChanged(userNames);
    }
  }

  handleUserSelected(userName) {
    let users = this.state.users;

    const selectedUser = users.find(user => {
      return user.userName === userName;
    });

    if (selectedUser.isSelected) {
      selectedUser.isSelected = !selectedUser.isSelected;
    } else {
      const otherSelectedUser = users.find(user => {
        return user.isSelected === true;
      });
      if (!otherSelectedUser) {
        selectedUser.isSelected = true;
      } else {
        users = this.swapUsers(users, selectedUser, otherSelectedUser);
        otherSelectedUser.isSelected = false;
        this.handleColumnOrderChanged();
      }
    }

    this.setState({users});
  }

  render() {
    const style = require('./ColumnOrderPicker.scss');

    const renderTwitterUsers = (user, index) => {
      return (
        <TwitterUser key={index}
          twitterUserName={user.userName}
          isSelected={user.isSelected}
          onClick={this.handleUserSelected.bind(this)} />
      );
    };

    return (
      <div className={style.MainContainer}>
        {this.state.users.map(renderTwitterUsers)}
      </div>
    );
  }
}
