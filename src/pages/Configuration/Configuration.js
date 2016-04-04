import React from 'react';
import {writeToLocalStorage, readLocalStorage} from './../../services/Storage';
import ColumnOrderPicker from './../../components/ColumnOrderPicker/ColumnOrderPicker';
import config from './../../config';

export default class Configuration extends React.Component {

  constructor(props, context) {
    super(props, context);

    let currentConfig = readLocalStorage(config.twitterStorageKey);
    if (!currentConfig) {
      currentConfig = config.defaultViewConfigurations;

      writeToLocalStorage(config.twitterStorageKey, currentConfig);
    }
    this.state = {
      twittsPerColumnCount: currentConfig.twittsPerColumnCount,
      websiteTheme: currentConfig.websiteTheme
    };
  }

  changeTwittsPerColumnCount(event) {
    if (event) {
      const newCount = event.target.value;
      this.setState({
        twittsPerColumnCount: newCount
      });
    }
  }

  themeChanged(event) {
    if (event) {
      const newTheme = event.target.value === '0' ? 'Blue' : 'Black';

      this.setState({ websiteTheme: newTheme});
    }
  }

  saveConfiguration() {
    const {twittsPerColumnCount, websiteTheme} = this.state;

    writeToLocalStorage(config.twitterStorageKey, {twittsPerColumnCount, websiteTheme} );
  }

  render() {
    const style = require('./Configuration.scss');

    return (
      <div className={style.MainContainer}>
        <div className={style.ThemeOptions_container}>
          <span> Web-site theme: </span>
          <select className={style.ThemeOptions_options} id="websiteTheme" onChange={this.themeChanged.bind(this)}>
            <option value="0"> Blue Theme</option>
            <option value="1"> Black Theme</option>
          </select>
        </div>
        <div className={style.TweetCount_container}>
          <span> Number of twitts: </span>
          <input className={style.TweetCount_input} id="twittsPerColumnCount"
            value={this.state.twittsPerColumnCount}
            onChange={this.changeTwittsPerColumnCount.bind(this)}/>
        </div>
        <div className={style.ColumnOrderContainer}>
          <ColumnOrderPicker/>
        </div>
        <button className={style.SaveConfigurationButton} onClick={this.saveConfiguration.bind(this)}>
          Save Configuration
        </button>
      </div>
    );
  }
}
