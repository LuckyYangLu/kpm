import React from  'react';
import Img from '../asset/asset.js';


import '../css/myboot.css';
import RankingItem from "./rankingItem";

class  RankingList extends React.Component{

   render(){
      const list=this.props.rankingData.slice(3,-1);
     return(
       <div id='rankingList'>
         <ul>{
           list.map((item,index)=>
            <RankingItem item={item} key={index}/>
           )

         }
         </ul>

       </div>
     );

   }


}


export  default RankingList;
