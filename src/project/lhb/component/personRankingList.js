import React from  'react';
import Img from '../asset/asset.js';


import '../css/myboot.css';
import PersonRankingItem from "./personRankingItem";

class PersonRankingList extends  React.Component{


  render() {
    const list=this.props.individualData;
    return (

        <div id='personRankingList'>
          <ul>{
            list.map((item,index)=>
              <PersonRankingItem item={item} key={index} index={index}/>
            )

          }
          </ul>
         </div>
    );
  }
}
export default PersonRankingList;
