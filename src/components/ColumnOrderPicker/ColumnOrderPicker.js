import React from 'react';
import TwitterUser from './../TwitterUser/TwitterUser';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const dragDropContext = DragDropContext;

@dragDropContext(HTML5Backend)
export default class ColumnOrderPicker extends React.Component {

  render() {
    const style = require('./ColumnOrderPicker.scss');

    return (
      <div className={style.MainContainer}>
        <TwitterUser twitterUserName="App Direct" />
        <TwitterUser twitterUserName="Laughing Squid" />
        <TwitterUser twitterUserName="Tech Crunch" />
      </div>
    );
  }
}
