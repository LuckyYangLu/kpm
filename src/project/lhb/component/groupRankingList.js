import React from  'react';
import Img from '../asset/asset.js';

import '../css/myboot.css';
import GroupRankingItem from "./groupRankingItem";

class GroupRankingList extends React.Component{

  render() {
    const list=this.props.groupData;
    return (
      <div id='groupRankingList'>
        <div id='groupBack'></div>
        <img id='groupBanner' src={Img.OALHB.halyYearTeam}></img>
        <ul>{
          list.map((item,index)=>
            <GroupRankingItem item={item} key={index} index={index}/>
          )

        }
        </ul>
      </div>
    );
  }
}
export default  GroupRankingList;
