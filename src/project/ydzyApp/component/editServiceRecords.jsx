import React from 'react';
import { List, Checkbox } from 'antd-mobile';

class ServiceRecord extends React.Component {


  constructor(props) {
    super(props);
    this.state={
      title:"填写服务记录"
    };

  }
  componentDidMount(){
    // 通过在componentDidMount里面设置setParams将title的值动态修改
    document.title = this.state.title;

  }

  render() {
    const CheckboxItem = Checkbox.CheckboxItem;
    const data = [
      { value: 1, label: '现场' },
      { value: 2, label: '电话' },
      { value: 3, label: '电子邮件' },
      { value: 4, label: '微信' },
      { value: 5, label: '短信' },
      { value: 6, label: 'QQ' },
    ];
    return (
      <div className='serviceRecords'>
        <ul>
          <li><span>客户姓名</span><input type='text' className='customerName' placeholder='请输入客户姓名'/></li>
          <li>
            <span className='checkBoxName'>请求渠道</span>
            <div className='checkBoxItems'>

              {data.map(i => (
                <CheckboxItem key={i.value} >
                  {i.label}
                </CheckboxItem>
              ))}

            </div>
          </li>
          <li><span>服务类型</span><input type='text' className='serviceType' placeholder='需求建议'/></li>
          <li><span>服务类型细别</span><input type='text' className='serviceCategory' placeholder='客户经理'/></li>
          <li><span>主题</span><textarea className='serviceTheme' placeholder='请输入主题'></textarea></li>
          <li><span>详细内容</span><textarea className='serviceDetail' placeholder='请输入服务详细内容'></textarea></li>
          <li><span>客户反馈</span><input type='text' className='serviceFeedback' placeholder='接受'/></li>
        </ul>
         <div className='buttons'><button>保存</button><button>关闭</button></div>


      </div>
    );
  }


}
export  default ServiceRecord;
