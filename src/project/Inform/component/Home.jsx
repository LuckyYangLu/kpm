import React from 'react';
import { Flex, Tabs, Toast } from 'antd-mobile';
import ListViewBox from '@/component/ListViewBox';
import fetch from '@/utils/fetch';
// import { getQueryString } from '@/utils/utils';
import handleFormat from './formatTime';

const iconTel = '';
import nullData from '@/assets/img/img_no_data.png';

const tabs = [{ title: '全部' }, { title: '开户中' }, { title: '被驳回' }];
const _pageSize = 10;

export default class Home extends React.Component {
  constructor (props) {
    super(props);

    const _initialPage = sessionStorage.getItem('initialPage') * 1;
    const queryObj = {key : 1};

    document.title = '断点开户';

    this.state = {
      key: queryObj['key'], // 未读消息的key
      initialPage: _initialPage || 0,  // 初始化Tab的index
      noDoneNum: 0, // 未开户总数,只在[全部]接口中返回
      updateTime: '', // 更新时间,只在[全部]接口中返回
      dataMeta0: [], // 元数据-开户中
      dataMeta1: [], // 元数据-被驳回
      dataMeta2: [], // 元数据-全部
      curtPage0: 1, // 当前页-开户中
      curtPage1: 1, // 当前页-被驳回
      curtPage2: 1, // 当前页-全部
      height: '100%', // listview高度
      getSucc0: false, // 数据请求是否成功,判定空数据的依据条件
      getSucc1: false,
      getSucc2: false
    };

    this.handleRouterTo = this.handleRouterTo.bind(this);
    this.onGetData = this.onGetData.bind(this);
  }

  /**
   * 组件挂载完成
   */
  componentDidMount () {
    this.handleCalcLVHeight();
    this.handleUpdateUnReadNum();
  }

  /**
   * 计算 Listview 的高度
   */
  handleCalcLVHeight () {
    var w = document.documentElement.clientWidth;
    var h = this.lvBox.clientHeight;
    var lh = Math.floor(h - w * 0.08 - 2);

    this.setState({ height: lh + 'px' });
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
   * 路由跳转的钩子
   * @param {Number} id 用户ID
   */
  handleRouterTo (id) {
    this.props.history.push('/steps/' + id);
  }

  /**
   * 将从后台获取的数据清洗成 ListView 需要的二维数组
   * @param {Array} data 后台原始数据
   * @return {Array} 返回listview 需要的字段数据
   */
  methodWashingData (data) {
    return data.map((item) => {
      // [用户编号, 用户名, 营业部名称, 联系方式, 开户渠道, 当前流程名称, 当前流程状态， 更新时间]
      return [
        item.id,
        item.custname || '佚名',
        item.departmentname || '--',
        item.mobileno || '--',
        item.channelname || '--',
        item.last_step || '未知状态',
        item.state,
        item.update_time ? handleFormat(item.update_time) : '未知时间'
      ];
    });
  }

  /**
   * 请求数据
   * @param {Number} key 列表判定 2：全部 0：开户中 1：被驳回
   */
  handleGetData (key) {
    Toast.loading('加载中', 3);
    var _key = key === 2 ? 'all' : key;

    fetch('/ydzy/incomplete/getIncompleteByCrmNo.html', {
      state: _key,
      currentPage: this.state[`curtPage${key}`],
      pageSize: _pageSize
    }, 'GET').then((res) => {
      // 请求成功
      Toast.hide();

      var _dataSource = this.methodWashingData(res.data.pagination.dataList);

      // 当前为[全部]列表请求返回的数据
      if (key === 2) {
        this.setState({
          noDoneNum: res.data.pagination.totalRecord,
          updateTime: handleFormat(res.data.time)
        });
      }

      this.setState({
        [`getSucc${key}`]: true,
        [`dataMeta${key}`]: this.state[`dataMeta${key}`].concat(_dataSource)
      });

      var _ltState = {
        isLoading: false,
        refreshing: false,
        hasMore: true
      };

      if (this.state[`curtPage${key}`] === res.data.pagination.totalPage) {
        _ltState['hasMore'] = false;
        this[`listView${key}`].setState(_ltState);
      } else {
        this[`listView${key}`].setState(_ltState);
      }
    }, (err) => {
      // 请求失败
      Toast.hide();
      Toast.fail(err.msg || err.errMsg || err.message, 3);

      this.setState({ [`getSucc${key}`]: true });
      this[`listView${key}`].setState({
        isLoading: false,
        refreshing: false
      });
    });
  }

  /**
   * 监听子组件获取数据的钩子
   * @param {Number} type listview 加载数据的动作 0：首次加载 1：下拉刷新 2：上拉加载
   * @param {Object} params 包含key值
   * @param {String|Number} params.key 列表标识 2：全部 0：开户中 1：被驳回
   */
  onGetData (type, params) {
	  console.log('>>>');
    if (type === 0) {
      // 首次加载
      this.handleGetData(params.key);
    } else if (type === 1) {
      // 下拉刷新
      if (!this.state[`getSucc${params.key}`]) return;

      this[`listView${params.key}`].setState({ hasMore: true });
      this.setState({
        [`curtPage${params.key}`]: 1,
        [`dataMeta${params.key}`]: [],
        [`getSucc${params.key}`]: false
      }, () => {
        this.handleGetData(params.key);
      });
    } else if (type === 2) {
      // 上拉加载
      if (!this.state[`getSucc${params.key}`]) return;

      var calcPage = this.state[`curtPage${params.key}`];
      calcPage++;

      this[`listView${params.key}`].setState({ isLoading: true });

      this.setState({
        [`curtPage${params.key}`]: calcPage
      }, () => {
        this.handleGetData(params.key);
      });
    }
  }

  render () {
    // 列表item
    const row = (rowData, rowID) => {
      return (
        <div className="cart-item" key={rowID} onClick={() => this.handleRouterTo(rowData[0])}>
          <div className="cart-row">
            <label className="cart-label">客户姓名：</label>
            <div className="cart-input-group">
              <label className="cart-input">{rowData[1]}</label>
              <div className={`cart-status cart-status-${rowData[6]}`}>{rowData[5]}</div>
            </div>
          </div>
          <div className="cart-row">
            <label className="cart-label">营 业 部 ：</label>
            <div className="cart-input-group">
              <label className="cart-input">{rowData[2]}</label>
            </div>
          </div>
          <div className="cart-row">
            <label className="cart-label">联系方式：</label>
            <div className="cart-input-group">
              <label className="cart-input">{rowData[3]}</label>
              <a href={`tel:${rowData[3]}`} className="cart-tel" onClick={(e) => e.stopPropagation()}>
                <img src={iconTel} className="img-responsive"/>
              </a>
            </div>
          </div>
          <div className="cart-row">
            <label className="cart-label">开户渠道：</label>
            <div className="cart-input-group">
              <label className="cart-input">{rowData[4]}</label>
              <div className="cart-time">{rowData[7]}</div>
            </div>
          </div>
        </div>
      );
    };
    // 空数据
    const isNullData = (<img src={nullData} className="is-null-image"/>);

    return (
      <div className="home-box">
        <Flex className="home-header">
          <Flex.Item className="label-tips">您有{this.state.noDoneNum}个客户尚未开户成功</Flex.Item>
          <Flex.Item className="label-time">{this.state.updateTime}</Flex.Item>
        </Flex>
        <div ref={(el) => this.lvBox = el} className="home-list">
          <Tabs
            tabs={tabs}
            swipeable={false}
            initialPage={this.state.initialPage}
            prerenderingSiblingsNumber={2}
            tabBarActiveTextColor="#fff"
            tabBarInactiveTextColor="#333333"
            tabBarTextStyle={{fontSize: '4vw', height: '8vw', lineHeight: '8vw'}}
            tabBarUnderlineStyle={{display: 'none'}}
            onChange={(tab, index) => {
              sessionStorage.setItem('initialPage', index);
            }}>
            {/* 全部排行榜 */}
            <ListViewBox
              ref={(el) => { this.listView2 = el; }}
              dataSource={this.state.dataMeta2}
              style={{height: this.state.height, overflow: 'auto'}}
              renderBody={() => ( <div className="ranking-list"></div> )}
              renderRow={row}
              renderFooter={() => {}}
              useBodyScroll={false}
              getDataSucc={this.state.getSucc0}
              initialListSize={_pageSize}
              pageSize={_pageSize}
              isNullData={this.state.dataMeta2.length === 0}
              nullData={isNullData}
              otherConfig={{key: 2}}
              getData={this.onGetData}/>
            {/* 开户中排行榜 */}
            {/* 被驳回排行榜 */}
          </Tabs>
        </div>
        <div className="home-foot">
          <label className="home-foot-tips">当前仅显示一个月内的开户断点客户数据</label>
        </div>
      </div>
    );
  }
}