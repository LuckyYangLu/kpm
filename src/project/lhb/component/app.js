import Img from '../asset/asset.js';
import React from  'react';



import RankingTop from "./rankingTop";
import RankingInfo from "./rankingInfo";
import RankingList from "./rankingList";




//app主组件
class App extends React.Component{

  //构造函数
  constructor(props){
    super(props);
    this.state={
      currentSelected:"月度",
      rankingData:[{id:1,name:'李国元', score: 345,ranking:1,department:'安徽宿州路证券营业部'},
        {id:2,name:'王国元', score: 345,ranking:2,department:'安徽宿州路证券营业部'},
        {id:3,name:'张国元', score: 345,ranking:3,department:'安徽宿州路证券营业部'},
        {id:4,name:'赵国元', score: 345,ranking:4,department:'安徽宿州路证券营业部'},
        {id:5,name:'孙国元', score: 345,ranking:5,department:'安徽宿州路证券营业部'},
        {id:6,name:'周国元', score: 345,ranking:6,department:'安徽宿州路证券营业部'},
        {id:30,name:'周国元', score: 200,ranking:7,department:'安徽宿州路证券营业部'},
        {id:45,name:'吴国元', score: 150,ranking:45,department:'安徽宿州路证券营业部'}
      ]

    };
  }




  render(){

   return(

    <div>
     <ul className="nav nav-pills" id="nav" >
       <li  className={(this.state.currentSelected ===   "月度"?"active":"")}onClick={()=>this.setState({currentSelected:"月度"})}>  <a href="#">月度</a></li>
       <li  className={(this.state.currentSelected === "半年度"?"active":"")}onClick={()=>this.setState({currentSelected:"半年度"})}><a href="#" >半年度</a></li>
       <li  className={(this.state.currentSelected ===   "年度"?"active":"")}onClick={()=>this.setState({currentSelected:"年度"})}>  <a href="#"  >年度</a></li>
     </ul>
      <RankingTop rankingData={this.state.rankingData}/>
      <div className='block'></div>
      <RankingInfo rankingData={this.state.rankingData}/>

      <RankingList rankingData={this.state.rankingData}/>




    </div>

   ) ;

  }

}
/*
 <RankingTop rankingData={this.state.rankingData}/>
  <RankingTop rankingData={this.state.rankingData}/>
     <div className='block'></div>
*  <RankingInfo rankingData={this.state.rankingData}/>

     <RankingList rankingData={this.state.rankingData}/>
* */
export default App;
  




