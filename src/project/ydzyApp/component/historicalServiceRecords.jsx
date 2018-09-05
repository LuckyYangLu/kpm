import React from 'react';
import ReactDOM from 'react-dom';

import ImgBution from '@/assets/img/ydzy_App/historyButton.png';
import ImgBution2 from '@/assets/img/ydzy_App/historyButton2.png';

class HistoricalServiceRecords extends React.Component {
      constructor(props){
        super(props);
        this.state={
          historyRecords:[],
          title:"历史服务记录",
          dialogDisplay: 'none',
          maskDisplayDisplay:'none',
        };

      }
  componentDidMount(){

    document.title = this.state.title;
    const  records=[
      {id:1,content:"联系客户新客户回访",employee:"张文(00000201172647)",time:"2018-08-07 10:28:29",tips:"客户拜访"},
      {id:2,content:"通知客户来营业部更新身份信息",employee:"张文(00000201172647)",time:"2018-08-07 10:28:29",tips:"客户拜访"},
      {id:3,content:"通知客户新股上市交易",employee:"张文(00000201172647)",time:"2018-08-07 10:28:29",tips:"客户拜访"},
      {id:4,content:"联系客户新客户回访",employee:"张文(00000201172647)",time:"2018-08-07 10:28:29",tips:"客户拜访"},
      {id:5,content:"联系客户新客户回访",employee:"张文(00000201172647)",time:"2018-08-07 10:28:29",tips:"客户拜访"},
      {id:6,content:"联系客户新客户回访",employee:"张文(00000201172647)",time:"2018-08-07 10:28:29",tips:"客户拜访"},
    ];
    this.setState({
     historyRecords:records,
    });
  }
  showHideDialog(){
    if (this.state.dialogDisplay=== "block") {
      this.setState({dialogDisplay: "none",  maskDisplayDisplay:'none'});
    } else {
      this.setState({dialogDisplay: "block", maskDisplayDisplay:'block'});
    }
  }
  hideDialog(){
    this.setState({dialogDisplay: "none",maskDisplayDisplay:'none'});
  }


  render() {
       const data=this.state.historyRecords;
       let display= this.state.dialogDisplay;
       let maskDisplay= this.state.maskDisplayDisplay;
    return (
      <div className='hisSerRecords' >
          <ul>
            {
              data.map((record,index)=>{
                return <li key={index}>
                  <div className='hisContent'>{record.content}</div>
                  <div className='hisEmployee'>{record.employee}</div>
                  <div className='hisCommon'><span className='hisTime'>{record.time}</span><span className="hisTip">{record.tips}</span></div>
                </li>;
              })
            }
          </ul>
          <div className='historyDialog' style={{display:display}}>

              <div><span>服务类别:</span><br/><input type='text' name='HisServiceTpye' placeholder='业务咨询'/></div>
              <div><span>客户:</span><br/><input type='text' name='HisServiceCustomer' placeholder='请输入客户号／客户姓名'/></div>
              <div><span>标题关键字:</span><br/><input type='text' name='HisServiceTitle' placeholder='请输入客户号／客户姓名'/></div>
              <div>
                <span>日期:</span><br/>
                <input className='timeFrom' type='text' placeholder='2017-10'/><span className='fromTo'>至</span>
                <input className='timeTo' type='text' placeholder='2017-10'/>
              </div>
              <button className='confirmButton'>确定</button>
              <img src={ImgBution2} className='cancelButton' onClick={this.hideDialog.bind(this)}/>
          </div>
          <img  src={ImgBution} className='historyDialogButton' onClick={this.showHideDialog.bind(this)}></img>
          <div className='mask' style={{display:maskDisplay}}></div>
      </div>

    );
  }



}

export  default HistoricalServiceRecords;
