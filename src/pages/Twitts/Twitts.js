import React from 'react';
import Twitt from './../../components/Twitt/Twitt';
import {getTwitts} from './../../services/TwitterClient';

export default class Twitts extends React.Component {

  componentWillMount() {
    getTwitts()
      .then(result => {
        this.setState({twitts: result});
      });
  }

  render() {
    const style = require('./Twitts.scss');

    const listItem = (twitt, index) => {
      return (
        <div key={index} className={style.TwittContainer_row}>
          <div className={style.TwittContainer_column}>
            {twitt.appDirect ? <Twitt twittContent={twitt.appDirect}/> : <span/>}
          </div>
          <div className={style.TwittContainer_column}>
            {twitt.techCrunch ? <Twitt twittContent={twitt.techCrunch}/> : <span/>}
          </div>
          <div className={style.TwittContainer_column}>
            {twitt.laughingSquid ? <Twitt twittContent={twitt.laughingSquid}/> : <span/>}
          </div>
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
