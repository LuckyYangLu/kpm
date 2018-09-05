import React from  'react';
import Img from '../asset/asset.js';

import '../css/myboot.css';

class GrouprankingItem extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    const list=this.props.item;
    const index=this.props.index;
    var renders;
    if(index==0){
      renders=<img className='grankingPng' src={Img.OALHB.first}/>;
    }else if (index==1) {
      renders=<img className='grankingPng'src={Img.OALHB.second}/>;
    }else if (index==2) {
      renders=<img className='grankingPng'src={Img.OALHB.third}/>;
    } else {
      renders=index+1;
    }
    return (
      <div>
        <li>
          <div className='groupListId'>{renders}</div>
          <div className="groupListDepart">{list.department}</div>
          <div className='groupListScore'>{list.score}</div>
          <div className="groupClear"></div>
        </li>
      </div>
    );
  }
}

export default GrouprankingItem;
