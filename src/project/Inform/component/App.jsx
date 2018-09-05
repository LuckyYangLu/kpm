import React from 'react';
import { List, Badge, Toast } from 'antd-mobile';
import fetch from '@/utils/fetch';

export default class App extends React.Component {
  constructor () {
    super();

    document.title = '提醒列表';

    this.state = {
      tipDataList: []
    };
  }

  /**
   * 组件挂载完成，获取数据
   */
  componentDidMount () {
    this.handleGetData();
  }

  /**
   * 路由跳转
   * @param {String} key
   */
  handleRouterTo (key) {
    let _toPath = '';

    // 断点开户
    if (key === 'IncompleteServiceImpl') _toPath = '/home?key=' + key;
    // 首次入金
    if (key === 'FirstGoldenServiceImpl') _toPath = '/gold?type=1&key=' + key;
    // 首次交易
    if (key === 'FirstDealServiceImpl') _toPath = '/trade?type=2&key=' + key;

    this.props.history.push(_toPath);
  }

  /**
   * 获取数据
   */
  handleGetData () {
    Toast.loading('加载中', 3);

    fetch('/ydzy/remind/getAllReminds.html', {}, 'GET')
      .then((res) => {
        // 获取成功
        Toast.hide();

        this.setState({
          tipDataList: res.data
        });
      }, (err) => {
        // 获取失败
        Toast.fail(err.msg || err.message || err.errMsg, 3);
      });
  }

  render () {
    return (
      <div className="index-box">
        {
          this.state.tipDataList.map((item, index) => {
            return (
              <List className="index-list" key={index}>
                <List.Item
                  thumb={item.icon}
                  arrow="horizontal"
                  extra={<Badge text={item.unreadcount} overflowCount={99} />}
                  onClick={() => this.handleRouterTo(item.redisKey)}>{item.title}</List.Item>
              </List>
            );
          })
        }
      </div>
    );
  }
}