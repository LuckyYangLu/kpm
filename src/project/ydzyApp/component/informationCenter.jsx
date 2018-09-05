import React from 'react';
import ListViewBox from '@/component/ListViewBox';

import { Tabs, WhiteSpace,Toast } from 'antd-mobile';

import nullData from '@/assets/img/img_no_data.png';


class InformationCenter extends React.Component{

  constructor(props){
    super(props);
    const tabs = [
      { title: '  最新  ' },
      { title: '特别提示' },
      { title: '市场要文' },
      { title: '交易所公告' },
    ];
    this.state={
      tabs:tabs,
      dataMeta: [], // 元数据
      curtPage: 1, // 当前页
      height: '70vw', // listview高度
      getSucc: true, // 数据请求是否成功,判定空数据的依据条件
    };
    this.onGetData = this.onGetData.bind(this);
  }

  /**
   * 监听子组件获取数据的钩子
   * @param {Number} type listview 加载数据的动作 0：首次加载 1：下拉刷新 2：上拉加载
   */
  onGetData (type) {
    Toast.loading('加载中', 3);
    if (type === 0) {
      // 首次加载
      this.setState({
        getSucc: true,
        dataMeta: [{ id:1,info:'加息还是降息？贸易战困境令货币政策分歧加剧',time:'2018-08-07' },
                    { id:2,info:'加息还是降息？贸易战困境令货币政策分歧加剧',time:'2018-08-07' }]
      });
    } else if (type === 1) {
      // 下拉刷新

    } else if (type === 2) {
      // 上拉加载

    }


  }
  render(){
    // 列表item
    const row = (rowData, rowID) => {
      return (
        <div className="infoCenter-listItem" key={rowID} >
          <a href='#' className='listLink'>{rowData.info}</a>
          <span>{rowData.time}</span>
        </div>
        );
      };
    // 空数据
    const isNullData = (<img src={nullData} className="is-null-image"/>);
    const _pageSize = 2;

    return(
      <div ref={(el) => this.textObj = el}>
        <Tabs tabs={this.state.tabs} initialPage={0} animated={false} useOnPan={false}>
          <div className='infoCenterDiv' >
            <ListViewBox
              ref={(el) => { this.listView = el; }}
              dataSource={this.state.dataMeta}
              style={{height: this.state.height, overflow: 'auto'}}
              renderBody={() => ( <div className="infoCenter-listInfo"></div>)}
              renderRow={row}
              renderFooter={() => {}}
              useBodyScroll={true}
              getDataSucc={this.state.getSucc}
              initialListSize={_pageSize}
              pageSize={_pageSize}
              isNullData={this.state.dataMeta.length === 0}
              nullData={isNullData}
              getData={this.onGetData}/>
          </div>

          <div className='infoCenterDiv'>
            <ListViewBox
              ref={(el) => { this.listView = el; }}
              dataSource={this.state.dataMeta}
              style={{height: this.state.height, overflow: 'auto'}}
              renderBody={() => ( <div className="infoCenter-listInfo"></div>)}
              renderRow={row}
              renderFooter={() => {}}
              useBodyScroll={true}
              getDataSucc={this.state.getSucc}
              initialListSize={_pageSize}
              pageSize={_pageSize}
              isNullData={this.state.dataMeta.length === 0}
              nullData={isNullData}
              getData={this.onGetData}/>
          </div>
          <div className='infoCenterDiv'>
            <ListViewBox
              ref={(el) => { this.listView = el; }}
              dataSource={this.state.dataMeta}
              style={{height: this.state.height, overflow: 'auto'}}
              renderBody={() => ( <div className="infoCenter-listInfo"></div>)}
              renderRow={row}
              renderFooter={() => {}}
              useBodyScroll={true}
              getDataSucc={this.state.getSucc}
              initialListSize={_pageSize}
              pageSize={_pageSize}
              isNullData={this.state.dataMeta.length === 0}
              nullData={isNullData}
              getData={this.onGetData}/>
          </div>
          <div className='infoCenterDiv'>
            <ListViewBox
              ref={(el) => { this.listView = el; }}
              dataSource={this.state.dataMeta}
              style={{height: this.state.height, overflow: 'auto'}}
              renderBody={() => ( <div className="infoCenter-listInfo"></div>)}
              renderRow={row}
              renderFooter={() => {}}
              useBodyScroll={true}
              getDataSucc={this.state.getSucc}
              initialListSize={_pageSize}
              pageSize={_pageSize}
              isNullData={this.state.dataMeta.length === 0}
              nullData={isNullData}
              getData={this.onGetData}/>
          </div>
        </Tabs>

      </div>
    );
  }




}

export  default InformationCenter;
