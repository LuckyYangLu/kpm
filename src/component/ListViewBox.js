/**
 * ListView 公共组件
 * @desc 已添加 上拉加载、下拉刷新
 * @version 1.0.0
 * @author xlz 2018.4.1
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ListView, PullToRefresh } from 'antd-mobile';

export default class ListViewBox extends React.Component {
  constructor (props) {
    super(props);
    
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      isLoading: true,      // 加载状态
      hasMore: true,        // 是否是最后一页
      refreshing: true      // 拉动刷新的状态
    };

    this.onRefresh = this.onRefresh.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
  }

  /**
   * 组件挂载完成，触发父组件的getData函数获取数据
   * @desc 传递number: 0，标识为首次加载
   */
  componentDidMount () {
    this.props.getData(0, this.props.otherConfig);
  }

  /**
   * props数据更新时触发的生命周期
   * @param {Object} nextProps 父组件传递的props数据
   */
  componentWillReceiveProps (nextProps) {
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource) });
  }

  /**
   * 下拉刷新
   * @desc 传递number: 1，标识为下拉刷新动作
   */
  onRefresh () {
    this.setState({refreshing: true, isLoading: true});
    this.props.getData(1, this.props.otherConfig);
  }

  /**
   * 上拉加载
   * @desc 传递number: 2，标识为上拉加载动作
   */
  onEndReached () {
    if (this.state.isLoading || !this.state.hasMore) {
      return;
    }

    this.setState({refreshing: true, isLoading: true});
    this.props.getData(2, this.props.otherConfig);
  }

  render () {
    if (!this.state.refreshing && this.props.getDataSucc && this.props.dataSource.length === 0) {
      return (
        <div>{this.props.nullData}</div>
      );
    } else {
      return (
        <ListView
          ref={(el) => { this.lv = el; }}
          className={this.props.className}
          dataSource={this.state.dataSource}
          renderBodyComponent={this.props.renderBody}
          renderRow={this.props.renderRow}
          renderFooter={() => (
            <div style={{ padding: 10, textAlign: 'center' }}>
              {this.state.isLoading ? '加载中...' : '暂无更多数据了...'}
            </div>
          )}
          onEndReached={this.onEndReached}
          pullToRefresh={<PullToRefresh
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
          />}
          style={this.props.style}
          initialListSize={this.props.initialListSize}
          pageSize={this.props.pageSize}
          scrollRenderAheadDistance={500}
          onEndReachedThreshold={10}
        />
      );
    }
  }
}

ListViewBox.propTypes = {
  dataSource: PropTypes.array,      // listview 数据
  className: PropTypes.string,      // listview 的类名
  style: PropTypes.object,          // listview 样式
  renderBody: PropTypes.func,       // listview 列表的父级DOM
  renderRow: PropTypes.func,        // 每行item的DOM
  renderFooter: PropTypes.func,     // listview 页脚
  otherConfig: PropTypes.object,    // 其它配置参数
  getData: PropTypes.func,          // 获取数据的钩子
  getDataSucc: PropTypes.bool,      // 获取数据是否成功
  nullData: PropTypes.object,       // 空数据状态
  initialListSize: PropTypes.number,// 组件刚挂载的时候渲染多少行数据
  pageSize: PropTypes.number        // 每页条数
};

ListViewBox.initialState = {};
