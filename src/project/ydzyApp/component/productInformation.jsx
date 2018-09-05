import React from  'react';


import ImgBanner from '@/assets/img/ydzy_App/banner.png';
import ImgQrCode from '@/assets/img/ydzy_App/QR_Code.png';
import ImgQrHead from '@/assets/img/ydzy_App/head.png';


//app主组件
class ProductInformation extends React.Component{

  //构造函数
  constructor(props){
    super(props);
    this.state={
      rateNum:'5%',
      rateDetail:'预期年化收益率',
      purchaseNum:'5万起购',
      purchaseDetial:'低风险',
      name:'', phone:'', CRM:'',department:'',company:'',month:'',year:'',
    };
  }
  componentDidMount(){
    let name='张三';
    let phone='18521652562';
    let CRM='002120000015';
    let department='合肥四牌楼营业部';
    let company='国元证券股份有限公司';
    let month='7.30';
    let year='2018';
    this.setState({
      name,phone,CRM,department,company,month,year,
    });

  }
  render(){

   return(

    <div id='productInformationBg'>
        <div className='title'>产品名称XXXXXXA</div>
        <div className='productInfo'>
          <div className='rate'>
            <div className='rateNum'>{this.state.rateNum}</div>
            <div className='rateDetail'>{this.state.rateDetail}</div>
          </div>
          <div className='purchase'>
            <div className='purchaseNum'>{this.state.purchaseNum}</div>
            <div className='purchaseDetail'>{this.state.purchaseDetial}</div>
          </div>
          <div className='clear'></div>
        </div>
        <div className='qrInfo'>
          <img className='qrCode'src={ImgQrCode}/>
          <img className='qrBanner'src={ImgBanner}/>

        </div>
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

        <div id='bottomMs'className='clear'>有多年金融行业经验，具有丰富的理财业务知识有多年理财业务
          有多年金融行业经验，具有丰富的理财业务.....</div>

      </div>
    </div>

   ) ;

  }

}

export default ProductInformation;
  




