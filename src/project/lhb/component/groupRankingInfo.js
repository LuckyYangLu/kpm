import React from  'react';
import Img from '../asset/asset.js';

import '../css/myboot.css';

class GroupRankingInfo extends  React.Component{
  constructor(props){
    super(props);
    this.state={
      departmentId:45, /*部门的id*/
      departmentScore:-1,/*部门的得分*/
      departRanking:-1/*部门排名*/
    };
  }
  componentDidMount(){

    let dataInfo=this.props.groupData;
    dataInfo.forEach((item)=>{
      if (item.id==45){
        let departmentScore=item.score;

        let departRanking=item.ranking;
        this.setState({
          departmentScore:departmentScore,
          departRanking:departRanking
        });
      }

    });
  }

  render() {
    let result=this.state.departRanking-10;
    let str=result>0?`您的营业部暂未达标，加油！`:`您的营业部排名为${this.state.departRanking}！`;
    return (
      <div id='groupRankingInfo'>
        <ul>
          <li id='groupRangkingInfoScore'><img src={Img.OALHB.integral}/>当前营业部积分：<span>{this.state.departmentScore}分</span></li>
          <li id='groupRangkingInfoNum'><img src={Img.OALHB.ranking}/> 营业部人均积分排名：<span>{this.state.departRanking}</span></li>
        </ul>
        <div id='groupBannerBottom'><span id='groupInfo'>{str}</span></div>
      </div>
    );
  }
}


export default GroupRankingInfo;

