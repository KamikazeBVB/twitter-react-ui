import React from 'react';
import {writeToLocalStorage, readLocalStorage} from './../../services/Storage';
import ColumnOrderPicker from './../../components/ColumnOrderPicker/ColumnOrderPicker';
import config from './../../config';

export default class Configuration extends React.Component {

  componentWillMount() {
    let currentConfig = readLocalStorage(config.twitterStorageKey);
    if (!currentConfig) {
      currentConfig = config.defaultViewConfigurations;

      writeToLocalStorage(config.twitterStorageKey, currentConfig);
    }
    this.setState({
      twittsPerColumnCount: currentConfig.twittsPerColumnCount,
      websiteTheme: currentConfig.websiteTheme,
      twitterUserNames: currentConfig.twitterUserNames
    });
  }

  changeTwittsPerColumnCount(event) {
    if (event) {
      const newCount = event.target.value;
      this.setState({
        twittsPerColumnCount: newCount
      });
    }
  }

  changeColumnOrder(twitterUserNames) {
    this.setState({twitterUserNames});
  }

  themeChanged(event) {
    if (!event) return;
    const newTheme = event.target.value;

    this.setState({ websiteTheme: newTheme});
  }

  saveConfiguration() {
    const {
      twittsPerColumnCount,
      websiteTheme,
      twitterUserNames
    } = this.state;

    writeToLocalStorage(config.twitterStorageKey, {
      twittsPerColumnCount,
      websiteTheme,
      twitterUserNames
    });
  }

  render() {
    const style = require('./Configuration.scss');

    return (
      <div className={style.MainContainer}>
        <div className={style.ThemeOptions_container}>
          <span> Web-site theme: </span>
          <select className={style.ThemeOptions_options}
              id="websiteTheme"
              onChange={this.themeChanged.bind(this)}
              value={this.state.websiteTheme}>
            <option value="Blue"> Blue Theme</option>
            <option value="Black"> Black Theme</option>
          </select>
        </div>
        <div className={style.TweetCount_container}>
          <span> Number of twitts: </span>
          <input className={style.TweetCount_input} id="twittsPerColumnCount"
            value={this.state.twittsPerColumnCount}
            onChange={this.changeTwittsPerColumnCount.bind(this)}/>
        </div>
        <div className={style.ColumnOrderContainer}>
          <label> Please select new positions for the columns! </label>
          <ColumnOrderPicker
            onColumnOrderChanged={this.changeColumnOrder.bind(this)}
            twitterUserNames={this.state.twitterUserNames}/>
        </div>
        <button className={style.SaveConfigurationButton} onClick={this.saveConfiguration.bind(this)}>
          Save Configuration
        </button>
      </div>
    );
  }
}
