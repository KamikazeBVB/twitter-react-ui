import React, {PropTypes} from 'react';
import { ItemTypes } from './../../constants';
import { DragSource } from 'react-dnd';

const dragSource = DragSource;

const twitterUserSource = {
  beginDrag() {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

@dragSource(ItemTypes.TWITTERUSER, twitterUserSource, collect)
export default class TwitterUser extends React.Component {
  static propTypes = {
    twitterUserName: PropTypes.string.isRequired,
    connectDragSource: PropTypes.func.isRequired,
  }

  render() {
    const style = require('./TwitterUser.scss');
    const { connectDragSource } = this.props;

    return connectDragSource(
      <div className={style.TwitterUser}>
        @{this.props.twitterUserName}
      </div>
    );
  }
}
