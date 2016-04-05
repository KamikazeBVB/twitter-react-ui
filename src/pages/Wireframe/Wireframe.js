import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import {readLocalStorage} from './../../services/Storage';
import config from './../../config';

export default class Wireframe extends React.Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  }

  componentWillMount() {
    const configurations = readLocalStorage(config.twitterStorageKey) ||
                           config.defaultViewConfigurations;

    this.setState({websiteTheme: configurations.websiteTheme});
  }

  render() {
    const styleRefernce = this.state.websiteTheme === 'Black' ? '_blackTheme' : '';
    const style = require(`./Wireframe${styleRefernce}.scss`);

    return (
        <div>
          <div className= {style.TitleContainer}>
            <h1 className={style.Title}> Twitter Feeds</h1>
          </div>
          <div className={style.LinkContainer}>
            <Link className={style.Link} to="/twitts">View twitts</Link>
            <Link className={style.Link} to="/configuration">Configurate UI</Link>
          </div>
          <div className={style.AppContainer}>
            {this.props.children}
          </div>
        </div>
      );
  }
}
