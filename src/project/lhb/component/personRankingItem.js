import React from  'react';
import Img from '../asset/asset.js';

import '../css/myboot.css';

class PersonRankingItem extends React.Component{
    constructor(props){
      super(props);
    }

  render() {
      const list=this.props.item;
      const index=this.props.index;
      var renders;
      if(index==0){
        renders=<img className='rankingPng' src={Img.OALHB.first}/>;
      }else if (index==1) {
        renders=<img className='rankingPng'src={Img.OALHB.second}/>;
      }else if (index==2) {
        renders=<img className='rankingPng'src={Img.OALHB.third}/>;
      } else {
        renders=index+1;
      }
    return (
      <div>
        <li>
          <div className='personListId'>{renders}</div>
          <div className="personListInfo">
            <div className='personListName'>{list.name}</div>
            <div className='personListDepart'>{list.department}</div>
          </div>
          <div className='personListScore'>{list.score}</div>
          <div className="personClear"></div>
        </li>
      </div>
    );
  }
}

export default PersonRankingItem;
