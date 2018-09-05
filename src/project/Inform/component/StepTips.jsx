/**
 * 流程描述
 */

import React from 'react';
import { Steps, Toast } from 'antd-mobile';
import fetch from '@/utils/fetch';

export default class StepTips extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      steps: []
    };
  }

  /**
   * 组件挂载完成
   * 从sessionStorage中获取流程数据,如果取到空值,则请求接口重新获取
   */
  componentDidMount () {
    try {
      const _steps = JSON.parse(sessionStorage.getItem('steps')) || [];

      if (_steps.length === 0) this.handleGetProcessData();

      this.setState({steps: _steps.reverse()});
    } catch (err) {
      this.handleGetProcessData();
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

        this.setState({steps: res.data.reverse()});
      }, (err) => {
        // 请求失败
        Toast.fail(err.msg || err.message || err.errMsg, 3);
      });
  }

  render () {
    return (
      <div className="state-box">
        <div className="state-steps-box step-tips-box">
          <Steps size="small">
            {
              this.state.steps.map((item, index) => {
                return (
                  <Steps.Step
                    title={
                      <div className="step-title">{item}</div>
                    }
                    key={index}
                    icon={<i className="step-icon">{this.state.steps.length - index}</i>}
                  />
                )
              })
            }
          </Steps>
        </div>
      </div>
    );
  }
}