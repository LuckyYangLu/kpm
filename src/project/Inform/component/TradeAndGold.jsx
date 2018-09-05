/**
 * 首次交易列表
 */
import React from 'react';
import { Toast } from 'antd-mobile';
import fetch from '@/utils/fetch';
import ListViewBox from '@/component/ListViewBox';
import { getQueryString } from '@/utils/utils';

import iconTel from '@/assets/img/AccountTracking/icon-tel.png';
import nullData from '@/assets/img/img_no_data.png';

// 卡片中label名
const cardLabel = {
  'trade': ['交易金额', '交易时间'],
  'gold': ['入金金额', '入金时间']
};
const _pageSize = 10;

export default class TradeAndGold extends React.Component {
  constructor (props) {
    super(props);

    const queryObj = getQueryString(props.location.search);

    let _title = '';
    if (queryObj['type'] === '1') _title = '首次入金';
    if (queryObj['type'] === '2') _title = '首次交易';
    document.title = _title;

    this.state = {
      curtPageName: props.match.url.slice(1), // 当前页面名
      type: queryObj['type'], // 当前页面标识 1：首次入金；2：首次交易
      key: queryObj['key'], // 未读消息的key
      dataMeta: [], // 元数据
      curtPage: 1, // 当前页
      height: '100%', // listview高度
      getSucc: false, // 数据请求是否成功,判定空数据的依据条件
    };

    this.onGetData = this.onGetData.bind(this);
  }

  /**
   * 更新阅读数
   */
  handleUpdateUnReadNum () {
    fetch('/ydzy/remind/updateRemind.html', {
      remindName: this.state.key
    }, 'POST')
    .then(() => {}, () => {});
  }

  /**
   * 将从后台获取的数据清洗成 ListView 需要的二维数组
   * @param {Array} data 后台原始数据
   * @return {Array} 返回listview 需要的字段数据
   */
  methodWashingData (data) {
    return data.map((item) => {
      // [客户姓名, 入金金额|交易金额, 联系方式, 入金时间|交易时间]
      return [
        item.khxm || '佚名',
        this.state.type === '1' ? item.zrje : item.cjje,
        item.khsj || '--',
        `${item.czrq} ${item.czsj}`,
      ];
    });
  }

  /**
   * 请求数据
   */
  handleGetData () {
    fetch('/ydzy/firstOperation/getFirstOperationByType.html', {
      type: this.state.type,
      currentPage: this.state.curtPage,
      pageSize: _pageSize
    }, 'GET').then((res) => {
      // 请求成功
      Toast.hide();

      // 更新阅读数
      this.handleUpdateUnReadNum();

      var _dataSource = this.methodWashingData(res.data.pagination.dataList);

      this.setState({
        getSucc: true,
        dataMeta: this.state.dataMeta.concat(_dataSource)
      });

      var _ltState = {
        isLoading: false,
        refreshing: false,
        hasMore: true
      };

      if (this.state.curtPage === res.data.pagination.totalPage) {
        _ltState['hasMore'] = false;
        this.listView.setState(_ltState);
      } else {
        this.listView.setState(_ltState);
      }
    }, (err) => {
      // 请求失败
      Toast.fail(err.msg || err.message || err.errMsg, 3);

      this.setState({ getSucc: true });
      this.listView.setState({
        isLoading: false,
        refreshing: false
      });
    });
  }

  /**
   * 监听子组件获取数据的钩子
   * @param {Number} type listview 加载数据的动作 0：首次加载 1：下拉刷新 2：上拉加载
   */
  onGetData (type) {
    Toast.loading('加载中', 3);

    if (type === 0) {
      // 首次加载
      this.handleGetData();
    } else if (type === 1) {
      // 下拉刷新
      this.listView.setState({ hasMore: true });
      this.setState({
        curtPage: 1,
        dataMeta: [],
        getSucc: false
      }, () => {
        this.handleGetData();
      });
    } else if (type === 2) {
      // 上拉加载
      var calcPage = this.state.curtPage;
      calcPage++;

      this.listView.setState({ isLoading: true });

      this.setState({
        curtPage: calcPage
      }, () => {
        this.handleGetData();
      });
    }
  }

  render () {
    const self = this;

    // 列表item
    const row = (rowData, rowID) => {
      return (
        <div className="cart-item" key={rowID}>
          <div className="cart-row">
            <label className="cart-label">客户姓名：</label>
            <div className="cart-input-group">
              <label className="cart-input">{rowData[0]}</label>
            </div>
          </div>
          <div className="cart-row">
            <label className="cart-label">{cardLabel[`${self.state.curtPageName}`][0]}：</label>
            <div className="cart-input-group">
              <label className="cart-input">{rowData[1]}</label>
            </div>
          </div>
          <div className="cart-row">
            <label className="cart-label">联系方式：</label>
            <div className="cart-input-group">
              <label className="cart-input">{rowData[2]}</label>
              <a href={`tel:${rowData[2]}`} className="cart-tel" onClick={(e) => {
                if (rowData[2] === '--') Toast.fail('暂无手机号码', 2);
                e.stopPropagation();
              }}>
                <img src={iconTel} className="img-responsive"/>
              </a>
            </div>
          </div>
          <div className="cart-row">
            <label className="cart-label">{cardLabel[`${self.state.curtPageName}`][1]}：</label>
            <div className="cart-input-group">
              <label className="cart-input">{rowData[3]}</label>
            </div>
          </div>
        </div>
      );
    };
    // 空数据
    const isNullData = (<img src={nullData} className="is-null-image"/>);

    return (
      <div className="trade-box">
        <ListViewBox
          ref={(el) => { this.listView = el; }}
          dataSource={this.state.dataMeta}
          style={{height: this.state.height, overflow: 'auto'}}
          renderBody={() => ( <div className="ranking-list"></div> )}
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
    );
  }
}