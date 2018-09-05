/**
 * 断点开户
 * @author xlz 2018.7.10
 */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import RouterMap from './router/routerMap';
// import vConsole from 'vconsole';

// new vConsole();

import 'antd-mobile/dist/antd-mobile.min.css';
// import '@/assets/css/layout.css';
// import '@/assets/css/ydzy_act.less';

ReactDOM.render(<RouterMap />, document.getElementById('app'));