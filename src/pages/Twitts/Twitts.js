import React from 'react';
import Twitt from './../../components/Twitt/Twitt';
import {getTwitts} from './../../services/TwitterClient';
import {readLocalStorage} from './../../services/Storage';
import config from './../../config';

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

  renderTwitt(value, style) {
    return (
      <div className={style.TwittContainer_column}>
        {value ? <Twitt twittContent={value}/> : <span/>}
      </div>
    );
  }

  render() {
    if (!this.state || this.state.isLoading) {
      return (
        <div/>
      );
    }

    const style = require('./Twitts.scss');

    const twitterUserNames = this.state.configurations.twitterUserNames;


    const listItem = (twitt, index) => {
      const twittOrder = twitterUserNames.map((userName) => {
        return Object.getOwnPropertyDescriptor(twitt, userName).value;
      });

      return (
        <div key={index} className={style.TwittContainer_row}>
          {this.renderTwitt(twittOrder[0], style)}
          {this.renderTwitt(twittOrder[1], style)}
          {this.renderTwitt(twittOrder[2], style)}
        </div>
      );
    };

    return (
      <div className={style.MainContainer}>
        <div className={style.TitleContainer}>
          <h1 className={style.TitleContainer_title}>Recent twitts</h1>
        </div>
        <div className={style.TwittContainer}>
          {this.state.twitts.map(listItem)}
        </div>
      </div>
    );
  }
}
