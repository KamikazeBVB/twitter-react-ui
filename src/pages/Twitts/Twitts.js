import React from 'react';
import Twitt from './../../components/Twitt/Twitt';
import {getTwitts} from './../../services/TwitterClient';
import {readLocalStorage} from './../../services/Storage';
import config from './../../config';
import {max, range} from 'lodash';

export default class Twitts extends React.Component {
  componentWillMount() {
    const configurations = readLocalStorage(config.twitterStorageKey) ||
                           config.defaultViewConfigurations;
    this.setState({isLoading: true});

    getTwitts(configurations)
      .then(result => {
        this.setState({twitts: result, configurations, isLoading: false});
      });
  }

  renderTwitt(value, style, theme) {
    return (
      <div className={style.TwittContainer_column}>
        {value ? <Twitt twittContent={value} theme={theme}/> : <span/>}
      </div>
    );
  }

  renderRowContainer(twits, index, style, theme) {
    return (
      <div key={index} className={style.TwittContainer_row}>
        {this.renderRow(twits, index, style, theme)}
      </div>
    );
  }

  renderRow(twits, index, style, theme) {
    return this.state.configurations.twitterUserNames.map((userName) => {
      return this.renderTwitt(twits[userName][index], style, theme);
    });
  }

  render() {
    if (!this.state || this.state.isLoading) {
      return (
        <div/>
      );
    }
    console.log(this.state.twitts);
    const styleRefernce = this.state.configurations.websiteTheme === 'Black' ? '_blackTheme' : '';
    const style = require(`./Twitts${styleRefernce}.scss`);

    const twitArray = Object.values(this.state.twitts);

    const largestLength = max(twitArray.map((array) => array.length));

    const rows = range(largestLength).map((rowNumber) => {
      return this.renderRowContainer(this.state.twitts, rowNumber, style, this.state.configurations.websiteTheme);
    });

    return (
      <div className={style.MainContainer}>
        <div className={style.TitleContainer}>
          <h1 className={style.TitleContainer_title}>Recent twitts</h1>
        </div>
        <div className={style.TwittContainer}>
          {rows}
        </div>
      </div>
    );
  }
}
