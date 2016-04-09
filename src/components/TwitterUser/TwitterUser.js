import React, {PropTypes} from 'react';
import { DragSource } from 'react-dnd';
import {ItemTypes} from './../../constants';
import { DropTarget } from 'react-dnd';

const dragSource = DragSource;
const dropTarget = DropTarget;

const twitterUserSource = {
  beginDrag(props) {
    props.onClick(props.twitterUserName);
    return {
      twitterUserName: props.twitterUserName
    };
  },
};

const twitterUserTarget = {
  drop(props, monitor) {
    console.log('dropped', props.twitterUserName);
    console.log('monitor.dropped', monitor.getItem());
  }
};

function collect(connect) {
  return {
    connectDragSource: connect.dragSource()
  };
}

function collectDrop(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

@dropTarget(ItemTypes.TWITTERUSER, twitterUserTarget, collectDrop)
@dragSource(ItemTypes.TWITTERUSER, twitterUserSource, collect)
export default class TwitterUser extends React.Component {
  static propTypes = {
    twitterUserName: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onClick: PropTypes.func,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  }

  handleClick() {
    if (this.props.onClick) {
      this.props.onClick(this.props.twitterUserName);
    }
  }

  render() {
    const style = require('./TwitterUser.scss');
    const { connectDragSource, connectDropTarget } = this.props;
    const mainDivStyle = this.props.isSelected ?
                            style.TwitterUser_selected : style.TwitterUser;
    return connectDropTarget(connectDragSource(
      <div className={mainDivStyle}>
        <span onClick={this.handleClick.bind(this)}>
          @{this.props.twitterUserName}
        </span>
      </div>
    ));
  }
}

