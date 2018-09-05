import Img from '../asset/asset.js';
import React from  'react';


class NoRanking extends React.Component{
    constructor(props){
      super(props);
    }

  render() {
    return (
      <div>
        <div id='groupBack'></div>
        <img id='noRankingBanner' src={Img.OALHB.noRanking}></img>
        <div id='noRankingInfo'><span >榜单暂未出炉</span></div>

      </div>
    );
  }
}

export default NoRanking;
