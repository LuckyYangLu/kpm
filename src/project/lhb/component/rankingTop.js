import React from  'react';
import Img from '../asset/asset.js';



import '../css/myboot.css';


class RankingTop extends React.Component{
  constructor(props){
    super(props);

  }

  render() {
    const  bgImg=Img.OALHB.monthly;
    let dataInfo=this.props.rankingData;
    return (
      <div id='bgImg'>
        <img id='rule'src={Img.OALHB.rule} alt="background"/>
        <div id='second'>
          <ul>
            <li><img id='number2' src={Img.OALHB.number2}/></li>
            <li><img className='header' src={Img.OALHB.header}/></li>
            <li><span id='nameTop2'>{dataInfo[1].name}</span></li>
            <li><span id='departTop2'>{dataInfo[1].department}</span></li>
            <li><span id="scoreTop2">{dataInfo[1].score}分</span></li>
          </ul>
        </div>

        <div id='first'>
          <ul>
            <li><img id='number1' src={Img.OALHB.number1}/></li>
            <li><img className='header' src={Img.OALHB.header}/></li>
            <li><span id='nameTop1'>{dataInfo[0].name}</span></li>
            <li><span id='departTop1'>{dataInfo[0].department}</span></li>
            <li><span id="scoreTop1">{dataInfo[0].score}分</span></li>
          </ul>
        </div>

        <div id='third'>
          <ul>
            <li><img id='number3' src={Img.OALHB.number3}/></li>
            <li><img className='header' src={Img.OALHB.header}/></li>
            <li><span id='nameTop3'>{dataInfo[2].name}</span></li>
            <li><span id='departTop3'>{dataInfo[2].department}</span></li>
            <li><span id="scoreTop3">{dataInfo[2].score}</span></li>
          </ul>
        </div>

      </div>
    );
  }
}

/*
RankingTop.PropTypes={
  rankingData:PropTypes.array.isRequired
}
*/


export default RankingTop;
