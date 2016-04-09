import React, {PropTypes} from 'react';
import { DragSource } from 'react-dnd';
import {ItemTypes} from './../../constants';
import { DropTarget } from 'react-dnd';

const dragSource = DragSource;
const dropTarget = DropTarget;

const twitterUserSource = {
  beginDrag(props) {
    if (props.onDragBegin) {
      props.onDragBegin(props.twitterUserName, true);
    }

    return {
      twitterUserName: props.twitterUserName
    };
  },
  endDrag(props) {
    if (props.onDragEnd) {
      props.onDragEnd(props.twitterUserName);
    }

    return {
      twitterUserName: props.twitterUserName
    };
  }
};

const twitterUserTarget = {
  drop(props, monitor) {
    if (props.onDrop) {
      props.onDrop(props.twitterUserName,
                    monitor.getItem().twitterUserName);
    }
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
    onDragBegin: PropTypes.func,
    onDragEnd: PropTypes.func,
    onDrop: PropTypes.func,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
  }

  render() {
    const style = require('./TwitterUser.scss');
    const { connectDragSource, connectDropTarget } = this.props;
    const mainDivStyle = this.props.isSelected ?
                            style.TwitterUser_selected : style.TwitterUser;
    return connectDropTarget(connectDragSource(
      <div className={mainDivStyle}>
        <span>
          @{this.props.twitterUserName}
        </span>
      </div>
    ));
  }
}

