/**
 * 规则
 * 审核流程为正常状态时。当前步骤之前的所有步骤显示，后续的步骤不显示
 * 审核流程为不正常状态时。若被驳回的是【视频见证】,则该步骤之前的显示，后续不显示
 * 若被驳回的是其它步骤,则所有步骤显示,只将该步骤标记出来
 */

import React from 'react';
import { Steps, Toast } from 'antd-mobile';
import fetch from '@/utils/fetch';
import handleFormat from './formatTime';
import { trim } from '@/utils/utils';

import iconTips from '@/assets/img/AccountTracking/icon-help.png';
import iconNormal from '@/assets/img/AccountTracking/icon-lt-blue.png';
import iconError from '@/assets/img/AccountTracking/icon-lt-red.png';

export default class Detail extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      uid: props.match.params.id, // 客户ID
      allProgress: [], // 所有的流程
      renderProgess: [], // 需要渲染的流程
      channelName: '', // 客户姓名
      mobileno: '', // 联系方式
      state: '', // 流程是否正常 0：正常 1：被驳回
      rejreason: '', // 被驳回的描述信息
      updateTime: '', // 流程时间
      lastStep: '' // 当前流程的中文描述信息
    };
  }

  /**
   * 组件挂载完成
   */
  componentDidMount () {
    this.handleGetProcessData();
    this.handleGetUserData();
  }

  /**
   * 监听state数据更新，处理成需要渲染的数据,数据结构如下
   * @return {Array} [{
   *   stepName: "验证手机号", // 步骤名称
   *   stepTime: "", // 步骤时间
   *   stepState: "1", // 当前流程状态 0：正常 1：有步骤被驳回
   *   markerStep: 0, // 被驳回的步骤 0：正常 1：该步骤被驳回
   *   rejreason: "" // 被驳回的原因
   * }]
   */
  componentDidUpdate () {
    if (this.state.allProgress.length > 0 && this.state.channelName !== '' && this.state.renderProgess.length === 0) {
      var _result = [];

      for (let i = 0, j = this.state.allProgress.length; i < j; i++) {
        _result.push({
          stepName: this.state.allProgress[i],
          stepTime: '',
          stepState: this.state.state,
          markerStep: 0,
          rejreason: ''
        });

        if (this.state.lastStep === this.state.allProgress[i]) {
          _result[i].markerStep = 1;
          _result[i].stepTime = this.state.updateTime;
          _result[i].rejreason = this.state.rejreason;

          if (this.state.state === '0') {
            // 流程正常
            if (this.state.lastStep === this.state.allProgress[i]) break;
          } else {
            // 流程中有被驳回
            if (this.state.lastStep === '视频见证') break;
          }
        }
      }

      _result = _result.reverse();

      this.setState({renderProgess: _result});
    }
  }

  /**
   * 获取开户流程
   */
  handleGetProcessData () {
    fetch('/ydzy/incomplete/getOpeningProcess.html', {}, 'GET')
      .then((res) => {
        // 请求成功
        Toast.hide();

        sessionStorage.setItem('steps', JSON.stringify(res.data));
        this.setState({allProgress: res.data});
      }, (err) => {
        // 请求失败
        Toast.fail(err.msg || err.message || err.errMsg, 3);
      });
  }

  /**
   * 请求用户开户流程情况
   */
  handleGetUserData () {
    Toast.loading('加载中', 3);

    fetch('/ydzy/incomplete/getIncompleteInfoByCrmNoAnId.html', {
      id: this.state.uid
    }, 'GET').then((res) => {
      // 请求成功
      Toast.hide();

      this.setState({
        channelName: res.data.custname || '佚名',
        mobileno: res.data.mobileno || '--',
        lastStep: trim(res.data.last_step),
        state: res.data.state,
        rejreason: res.data.rejreason,
        updateTime: handleFormat(res.data.update_time)
      });
    }, (err) => {
      // 请求失败
      Toast.fail(err.msg || err.message || err.errMsg, 3);
    });
  }

  render () {
    return (
      <div className="state-box">
        {/* 顶部用户信息卡片 */}
        <div className="state-header">
          <div className="cart-row">
            <label className="cart-label">客户姓名：</label>
            <div className="cart-input-group">
              <label className="cart-input">{this.state.channelName}</label>
            </div>
          </div>
          <div className="cart-row">
            <label className="cart-label">联系方式：</label>
            <div className="cart-input-group">
              <label className="cart-input">{this.state.mobileno}</label>
            </div>
          </div>
          <div
            className='cart-icon-tips'
            onClick={() => this.props.history.push('/stepTips')}>
            <img src={iconTips} className="img-responsive"/>
          </div>
        </div>
        {/* 用户流程信息 */}
        <div className="state-steps-box">
          <Steps size="small" current={1}>
            {
              this.state.renderProgess.map((item, index) => {
                return (
                  <Steps.Step
                    title={
                      <div className="step-title">{item.stepName}<span className="step-time">{item.stepTime}</span></div>
                    }
                    key={index}
                    status='wait'
                    className={item.markerStep === 1 && `step-state-${item.stepState}`}
                    icon={
                      item.markerStep === 1 ?
                        item.stepState === '0' ?
                          <div className="step-icon-img"><img src={iconNormal} className="img-responsive" /></div>
                        : <div className="step-icon-img"><img src={iconError} className="img-responsive" /></div>
                      : <i className="step-icon">{this.state.renderProgess.length - index}</i>}
                    description={
                      item.stepName === this.state.lastStep && this.state.state === '1' && this.state.rejreason  ? `驳回原因：${item.rejreason}` : ''} />
                )
              })
            }
          </Steps>
        </div>
      </div>
    );
  }
}