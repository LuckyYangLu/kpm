import React from 'react';
import ImgQrHead from '@/assets/img/ydzy_App/head.png';


class InformationDetail extends React.Component{
  constructor(props){
    super(props);
    this.state={
      title:"资讯详情",
      informationTitle:'',
      informationSource:'',
      informationDate:'',
      informationContents:[],
      name:'', phone:'', CRM:'',department:'',company:'',month:'',year:'',
    };
  }
  componentDidMount(){

    document.title = this.state.title;
    const informationTitle='加息还是降息？贸易战困境令货币政策分歧加剧';
    const informationSource='来源  CRM';
    const informationDate='2018-08-07';
    const  informationContents=[
      {id:1,content:"金融咨询公司ContinuumEconomics的董事总经理加拉格尔(MikeGallagher)淡化了美国总统特朗普(DonaldTrump)对经济增长的预期。他还补充称，特朗普最近实施的税改政策只会为美国经济带来短期利益"},
      {id:2,content:"特朗普上周五在电视上表示，如果贸易赤字减半，美国可能会达到历史增长率。特朗普声称，美国的GDP增长率可以达到8%或9%，这远远高于经济学家的预测。此前公布的数据显示，美国第二季度的经济增长率为4.1%。不过，特朗普没有具体说明自己指的是年增长率还是季增长率。"},
      {id:3,content:"当被问及8%和9%的增长率预测时，加拉格尔"},
    ];
    let name='张三';let phone='18521652562';let CRM='002120000015';
    let department='合肥四牌楼营业部';let company='国元证券股份有限公司';
    let month='7.30';let year='2018';
    this.setState({
      informationTitle:informationTitle,
      informationSource:informationSource,
      informationDate:informationDate,
      informationContents:informationContents,
      name,phone,CRM,department,company,month,year,
    });
  }

  render() {
    return (
      <div className='informationDetail'>
        <span className='informationDetailTitle'>
          {this.state.informationTitle}
        </span>
        <span className='informationSource'>{this.state.informationSource}</span>
        <span className='informationDate'>{this.state.informationDate}</span>
        <p>{this.state.informationContents[0].content}</p>
        <p>{this.state.informationContents[1].content}</p>
        <p>{this.state.informationContents[2].content}</p>

       <div className='personInfo'>
          <div className='header'>
            <img src={ImgQrHead}/>
            <div id='month'>{this.state.month}</div>
            <div id='year'>{this.state.year}</div>
          </div>
          <div className='information'>
            <ul>
              <li><span>财富顾问</span>：<info>{this.state.name}</info> <span id='telephone'>电话</span><span id='weChat'>微信</span></li>
              <li><span>手机号</span>：{this.state.phone}</li>
              <li><span>CRM编号 </span>：{this.state.CRM}</li>
              <li><span>所属营业部</span>：{this.state.department}</li>
              <li><span>公司</span>：{this.state.company}</li>
            </ul>
          </div>
        </div>
        <div id='bottomMs'className='clear'>有多年金融行业经验，具有丰富的理财业务知识有多年理财业务
          有多年金融行业经验，具有丰富的理财业务.....</div>
      </div>
    );
  }

}



export  default InformationDetail;
