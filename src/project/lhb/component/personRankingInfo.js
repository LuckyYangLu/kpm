import React from  'react';
import Img from '../asset/asset.js';


import '../css/myboot.css';
/*个人的排名信息*/
class PersonRankingInfo extends React.Component{

  constructor(props){
    super(props);
    this.state={
      myId:45,
      myScore:-1,/*我的得分*/
      myRanking:-1,/*我的排名*/
      /* myTargetDiff:-1/!*排名差距*!/*/
    };
  }

  componentDidMount(){

    let dataInfo=this.props.individualData;
    dataInfo.forEach((item)=>{
      if (item.id==45){
        let myScore=item.score;
        console.log(myScore);

        let myRanking=item.ranking;
        this.setState({
          myScore:myScore,
          myRanking:myRanking
        });
      }

    });
  }

  render(){
    let result=this.state.myRanking-30;
    let str=result>0?`距离第30名仅差${result}名，请再接再励！`:`您现在的排名为${this.state.myRanking}名，，请再接再励！`;
    return(

      <div id='personRankingInfo'>
        <ul>
          <li id='personRangkingInfoScore'><img src={Img.OALHB.integral}/>我的积分：<span>{this.state.myScore}分</span></li>
          <li id='personRangkingInfoNum'><img src={Img.OALHB.ranking}/> 我的排名：<span>{this.state.myRanking}</span></li>
        </ul>
        <div id='personBanner'><span id='personInfo'>{str}</span></div>

      </div>
    );
  }
}

export default PersonRankingInfo;

