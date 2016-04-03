import React from 'react';

export default class NotFound extends React.Component {

  render() {
    const style = require('./NotFound.scss');

    return (
      <h2 className={style.NotFound}>Ups, the requested page was not found!</h2>
    );
  }
}
