import React, {PropTypes} from 'react';
import { DragDropContext } from 'react-dnd';
import TwitterUser from './../TwitterUser/TwitterUser';
import HTML5Backend from 'react-dnd-html5-backend';

const dragDropContext = DragDropContext;

@dragDropContext(HTML5Backend)
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

  swapUsers(firstUserName, secondUserName) {
    let users = this.state.users;

    const firstUser = users.find(user => {
      return user.userName === firstUserName;
    });

    const secondUser = users.find(user => {
      return user.userName === secondUserName;
    });

    const auxIndex = firstUser.index;

    firstUser.index = secondUser.index;
    secondUser.index = auxIndex;

    firstUser.isSelected = false;
    secondUser.isSelected = false;

    users = users.sort((first, second) => {
      if (first.index > second.index) return 1;
      if (first.index < second.index) return -1;
      return 0;
    });

    this.setState({users});
    this.handleColumnOrderChanged();
  }

  handleColumnOrderChanged() {
    if (this.props.onColumnOrderChanged) {
      const userNames = this.state.users.map(user => {
        return user.userName;
      });

      this.props.onColumnOrderChanged(userNames);
    }
  }

  handleUserDrag(userName, isDragBegin) {
    const users = this.state.users;

    const draggedUser = users.find(user => {
      return user.userName === userName;
    });

    if (draggedUser) {
      draggedUser.isSelected = isDragBegin === true;
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
          onDragBegin={this.handleUserDrag.bind(this)}
          onDragEnd={this.handleUserDrag.bind(this)}
          onDrop={this.swapUsers.bind(this)} />
      );
    };

    return (
      <div className={style.MainContainer}>
        {this.state.users.map(renderTwitterUsers)}
      </div>
    );
  }
}
