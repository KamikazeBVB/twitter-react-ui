import React, {PropTypes} from 'react';
import {Link} from 'react-router';

export default class Wireframe extends React.Component {

  static propTypes = {
    children: PropTypes.object.isRequired
  }

  render() {
    const style = require('./Wireframe.scss');

    return (
        <div>
          <div className= {style.TitleContainer}>
            <h1 className={style.Title}> Twitter Feeds</h1>
          </div>
          <div className={style.LinkContainer}>
            <Link className={style.Link} to="/tweets">View tweets</Link>
            <Link className={style.Link} to="/configuration">Configurate UI</Link>
          </div>
          <div className={style.AppContainer}>
            {this.props.children}
          </div>
        </div>
      );
  }
}
