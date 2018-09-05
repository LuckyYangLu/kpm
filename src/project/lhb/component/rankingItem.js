import React from  'react';
import Img from '../asset/asset.js';


import '../css/myboot.css';

class  RankingItem extends React.Component {

  render() {
    return (
      <li>
        <div className='listId'>{this.props.item.ranking}</div>
        <div className="listInfo">
          <div className='listName'>{this.props.item.name}</div>
          <div className='listDepart'>{this.props.item.department}</div>
        </div>
        <div className='listScore'>{this.props.item.score}</div>
        <div className="clear"></div>
      </li>
    );
  }

}
export default RankingItem;
